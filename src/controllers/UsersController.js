const passport = require("passport");
const Profile = require("../model/Profile");

module.exports = {
  async get(req, res) {
    await Profile.findAll({ raw: true })
      .then((users) => {
        let registerSuccess = req.flash("registerSuccess");
        registerSuccess =
        registerSuccess == undefined || registerSuccess.length == 0
        ? undefined
        : registerSuccess;

        let msgErrorLogin = req.flash("msgErrorLogin");
        msgErrorLogin =
        msgErrorLogin == undefined || msgErrorLogin.length == 0
        ? undefined
        : msgErrorLogin;

        res.render("login", { users: users, 
                              registerSuccess: registerSuccess, 
                              msgErrorLogin: msgErrorLogin
                            });
      })
      .catch((err) => {
        res.redirect("/register");
      });
  },

  async login(req, res, next) {
    let msgErrorLogin = "Username ou senha incorretos!"
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }else if(!user){
        req.flash('msgErrorLogin', msgErrorLogin)
        return res.redirect("/login");
      }else{
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });
      }  
    })(req, res, next);
  },

  logout(req, res) {
    req.session.passport = undefined;
    res.redirect("/");
  },
};
