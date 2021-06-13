const Profile = require("../model/Profile")
const Product = require("../model/Product")

module.exports = {
    async index(req, res) {
        const stringidUser = req.user.id
        const admin = stringidUser === 1
        const users = await Profile.findAll()
        const profile = await Profile.findOne({where: {id: stringidUser}})
        const products = await Product.findAll()

        if(!admin){
            res.redirect('/')
        }

        res.render('admin', {users: users, profile: profile, products: products})
    },

    async updateAmount(req, res) {
        const amountId = req.body.amountId
        const amount = req.body.amount
        const newAmount = Number(amount)
        const newAmountId = Number(amountId)
        const profile = await Profile.findOne({where: {id: newAmountId}})

        profile.totalBalance = profile.totalBalance + newAmount
        await profile.save()

        return res.redirect('/admin')
    },

    async deleteUsers(req, res) {
        const amountId = req.body.id_UserDel
        if(amountId !== undefined){
            if(!isNaN(amountId)){
             await Profile.destroy({where: {id: amountId}})
              res.redirect("/admin");
            }else{
              res.redirect("/admin");
            }
          }else{
            res.redirect("/admin");
          }
        }
}