const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const Profile = require("./model/Profile");

module.exports = async function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async function (username, password, done) {
        try {
          await Profile.findOne({ where: { userName: username } }).then((user) => {
            if (!user) {
              return done(null, false, { message: "Esta conta não existe!" });
            }

            const isValid = bcrypt.compareSync(password, user.password);

            if (!isValid) {
              return done(null, false, { message: "Senha incorreta!" });
            } else {
              return done(null, user);
            }
          });
        } catch (err) {
          console.log(err);
          done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      await Profile.findOne({ where: { id: id } }).then((user) => {
        done(null, user);
      });
    } catch (err) {
      console.log(err);
      return done(err, null);
    }
  });
};
