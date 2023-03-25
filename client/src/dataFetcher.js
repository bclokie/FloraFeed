import axios from "axios";
import { db } from "./firebase";
import { auth } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { documentId } from "firebase/firestore";
export const fetchUserData = async () => {
  const response = await axios.get(
    "https://firestore.googleapis.com/v1/projects/final-project-lhl-a053a/databases/(default)/documents/users"
  );
  const usersData = response.data.documents;

  return usersData.map((user) => ({
    userId: user.fields.uid.stringValue,
    userName: user.fields.userName.stringValue,
    userFirstName: user.fields.firstName.stringValue,
    userLastName: user.fields.lastName.stringValue,
    userAvatar: user.fields.avatarUrl.stringValue,
    posts: [],
  }));
};

export const fetchPostsData = async (users) => {
  const response = await axios.get(
    "https://firestore.googleapis.com/v1/projects/final-project-lhl-a053a/databases/(default)/documents/posts"
  );
  const postsData = response.data.documents;

  postsData.forEach((data, index) => {
    const date = new Date(data.createTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    const userId = data.fields.uid.stringValue;

    const user = users.find((user) => user.userId === userId);

    if (user) {
      user.posts.push({
        id: index + 1,
        plant: {
          commonName: data.fields.title.stringValue,
          scientificName: data.fields.plantName.stringValue,
          description: data.fields.description.stringValue,
          imageUrl: data.fields.image.stringValue,
          timePosted: `${formattedDate} ${formattedTime}`,
        },
      });
    }
  });

  return users;
};

export const fetchUserFavourites = async function () {
  let user;
  let favPostData = [];
  const userQuery = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser.uid)
  );
  const userQuerySnapshot = await getDocs(userQuery);
  userQuerySnapshot.forEach((doc) => {
    user = doc.data();
  });

  const postsQuery = query(
    collection(db, "posts"),
    where("__name__", "in", user.favourites)
  );
  const querySnapshot = await getDocs(postsQuery);
  querySnapshot.forEach((doc) => {
    favPostData.push(doc.data());
  });
  return favPostData;
};

export const fetchUser = async function () {
  let user;
  const userQuery = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser.uid)
  );
  const userQuerySnapshot = await getDocs(userQuery);
  userQuerySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

export const createPosts = function (posts, user) {
  console.log("posts is", posts);
  console.log("user is", user);
  // if (!posts || !user) {
  //   return;
  // }
  // const favouritesArr = [];
  // posts.forEach((data, index) => {
  //   favouritesArr.push({
  //     id: index + 1,
  //     user: {
  //       user: user.userName,
  //       userAvatar: user.userAvatar,
  //     },
  //     plant: {
  //       commonName: data.title,
  //       scientificName: data.plantName,
  //       description: data.description,
  //       imageUrl: data.image,
  //       timePosted: "test",
  //     },
  //   });
  //   console.log("fav array is", favouritesArr);
  // });
};

// commonName: "Monstera Deliciosa",
// scientificName: "Plant Scientific Name",
// description:
//   "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor.",
// imageUrl: "https://source.unsplash.com/random/1080x1080?sig=6",
// timePosted: "2 hours ago",
