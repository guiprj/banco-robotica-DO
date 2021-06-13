const passport = require("passport");
const Profile = require("../model/Profile");

module.exports = {
  get(req, res) {
    Profile.findAll({ raw: true })
      .then((users) => {
        res.render("login", { users: users });
      })
      .catch((err) => {
        res.redirect("/register");
      });
  },

  async login(req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/register");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.session.passport = undefined;
    res.redirect("/");
  },
};
