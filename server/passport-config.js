const LocalStrategy = require("passport-local").Strategy;

const mockUser = {
  id: 1,
  email: "brandy@example.com",
  password: "password123",
};

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      if (email === mockUser.email && password === mockUser.password) {
        return done(null, mockUser);
      } else {
        return done(null, false, { message: "Invalid email or password" });
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    if (id === mockUser.id) {
      return done(null, mockUser);
    } else {
      return done(null, false);
    }
  });
};
