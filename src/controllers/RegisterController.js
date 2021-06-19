const Profile = require("../model/Profile")
const bcrypt = require('bcryptjs')

module.exports = {
    async get(req, res) {
        profiles = await Profile.findAll({raw: true})
        
        let userExist = req.flash("userExist");
        userExist =
        userExist == undefined || userExist.length == 0
        ? undefined
        : userExist;

        let classroomError = req.flash("classroomError");
        classroomError =
        classroomError == undefined || classroomError.length == 0
        ? undefined
        : classroomError;
        
        return res.render("register", { profiles: profiles, userExist: userExist, classroomError: classroomError })
    },
    
    async getNewUser(req, res) {
        const name = req.body.nome_cad
        const avatar = "http//"
        const username = req.body.user_cad
        let senhaFild = req.body.senha_cad
        const salt = bcrypt.genSaltSync(10)
        let senhaUser  = bcrypt.hashSync(senhaFild, salt)
        const totalBalance = 0
        let classroom =  req.body.classroom_cad
        const userFound = await Profile.findOne({where: { userName: username }})
        let userExist = "Esse usuário já existe!"
        let classroomError = "Série não encontrada!"
        let registerSuccess = "Cadastro realizado com sucesso!"

        if(userFound){
            console.log(userFound)
            req.flash("userExist", userExist);
            res.redirect("/register");
        }else if(classroom.length > 1){
            req.flash("classroomError", classroomError);
            res.redirect("/register");
        }else{
            await Profile.create({
                name: name,
                avatar: avatar,
                userName: username,
                password: senhaUser,
                totalBalance: totalBalance,
                classroom: classroom
            }).then(()=>{
                req.flash("registerSuccess", registerSuccess);
                res.redirect("/login")
            }).catch(err=>{
                res.redirect('/register')
            })
        }  

    }
}