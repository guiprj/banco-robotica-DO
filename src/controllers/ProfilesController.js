const Profile = require("../model/Profile");
const Transaction = require("../model/Transaction");

module.exports = {
  async get(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({where: {id: stringidUser}})
    const transactions = await Transaction.findAll({where:{id_Aluno: stringidUser}})
    
    return res.render('profile', {profile: profile, transactions: transactions})
    
  },

  async updateRegister(req, res) {
    const userId = req.user.id;
    const profile = await Profile.findOne({where: {id: userId}})

    profile.name = req.body.name
    profile.avatar = req.body.avatar
    await profile.save()

    return res.redirect("/profile");
  },
};
