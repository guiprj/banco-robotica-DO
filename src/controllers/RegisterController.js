const Profile = require("../model/Profile")
const bcrypt = require('bcryptjs')

module.exports = {
    get(req, res) {
        Profile.findAll({raw: true}).then(profiles =>{
            res.render("register", { profiles: profiles })
        })
        
    },
    
    async getNewUser(req, res) {
        const name = req.body.nome_cad
        const avatar = "http//"
        const username = req.body.user_cad
        let senhaFild = req.body.senha_cad
        const salt = bcrypt.genSaltSync(10)
        let senhaUser  = bcrypt.hashSync(senhaFild, salt)
        const totalBalance = 0
        const classroom =  req.body.classroom_cad

        

    await Profile.create({
            name: name,
            avatar: avatar,
            userName: username,
            password: senhaUser,
            totalBalance: totalBalance,
            classroom: classroom
        }).then(()=>{
            res.redirect("/login")
        }).catch(err=>{
            res.redirect('/register')
        })

    }
}