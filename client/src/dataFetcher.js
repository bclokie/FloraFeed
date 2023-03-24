import axios from "axios";

export const fetchUserData = async () => {
  const response = await axios.get(
    "https://firestore.googleapis.com/v1/projects/final-project-lhl-a053a/databases/(default)/documents/users"
  );
  const usersData = response.data.documents;

  return usersData.map((user) => ({
    userId: user.fields.uid.stringValue,
    userName: user.fields.userName.stringValue,
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
