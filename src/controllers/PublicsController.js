const Public = require("../model/Public");
const Like = require("../model/Like");
const Profile = require("../model/Profile");
const slugify = require("slugify");

module.exports = {
  async get(req, res) {

    let titleNoExist = req.flash("titleNoExist");
    titleNoExist =
    titleNoExist == undefined || titleNoExist.length == 0 ? undefined : titleNoExist;

    let bodyNoExist = req.flash("bodyNoExist");
    bodyNoExist =
    bodyNoExist == undefined || bodyNoExist.length == 0 ? undefined : bodyNoExist;

    

    return res.render("created_publics", {
      titleNoExist: titleNoExist,
      bodyNoExist: bodyNoExist
    });
  },

  async getPublics(req, res) {
    const publics = await Public.findAll({
      order: [["id", "DESC"]],
      limit: 4,
    });

    let createdPublicSuccess = req.flash("createdPublicSuccess");
    createdPublicSuccess =
    createdPublicSuccess == undefined || createdPublicSuccess.length == 0 ? undefined : createdPublicSuccess;

    return res.render("publics", { 
      publics: publics,
      createdPublicSuccess: createdPublicSuccess 
    });
  },

  async getPagePublics(req, res) {
    let page = req.params.num;
    let offset = 0;

    if (isNaN(page || page == 1)) {
      offset = 0;
    } else {
      offset = (parseInt(page) - 1) * 4;
    }
    let publics = await Public.findAndCountAll({
      limit: 4,
      offset: offset,
      order: [["id", "DESC"]],
    });

    let next;
    if (offset + 4 >= publics.count) {
      next = false;
    } else {
      next = true;
    }

    let result = {
      page: parseInt(page),
      next: next,
      publics: publics,
    };
    return res.render("publicsPage", { result: result });
  },

  async getPublic(req, res) {
    const slug = req.params.slug;
    const public = await Public.findOne({ where: { slug: slug } });
    const idPublic = public.id;
    const likes = await Like.findAll({ where: { like_IdPublic: idPublic } });

    public.views = public.views + 1;
    await public.save();

    let likeExist = req.flash("likeExist");
        likeExist =
        likeExist == undefined || likeExist.length == 0 ? undefined : likeExist;

    let likeMake = req.flash("likeMake");
        likeMake =
        likeMake == undefined || likeMake.length == 0 ? undefined : likeMake;

    return res.render("public", {
      public: public,
      likes: likes,
      likeExist: likeExist,
      likeMake: likeMake
    });
  },

  async like(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const idPublic = req.body.idPublic;
    const slug = req.body.slug;
    const likeUserExist = await Like.findOne({
      where: {
        like_IdUser: stringidUser,
        like_IdPublic: idPublic,
      },
    });

    let likeExist = "Ei! Não pode curtir de novo!";
    let likeMake = "agradece pela curtida!";

    if (likeUserExist) {
      req.flash("likeExist", likeExist);
      res.redirect(`/publics/${slug}`);
    } else {
      await Like.create({
        like_IdPublic: idPublic,
        like_IdUser: stringidUser,
        like_UserName: profile.userName,
      });
      req.flash("likeMake", likeMake);
      res.redirect(`/publics/${slug}`);
    }
  },

  async publicCreate(req, res) {
    const stringidUser = req.user.id;
    const title = req.body.title;
    const bodyPublic = req.body.bodyPublic;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const created_id = profile.id;
    const created_userName = profile.userName;
    const created_avatar = profile.avatar;
    const views = 0;

    let titleNoExist = "Insira um Títilo para sua publicação."
    let bodyNoExist = "Insira o conteúdo da sua publicação."
    let createdPublicSuccess = "Publicação criada com sucesso!"

    if (
      title === undefined ||
      title === " " ||
      title === null ||
      title === ""
    ) {
      req.flash("titleNoExist", titleNoExist);
      res.redirect("/created-publics");
    } else if (
      bodyPublic === undefined ||
      bodyPublic === " " ||
      bodyPublic === null ||
      bodyPublic === ""
    ) {
      req.flash("bodyNoExist", bodyNoExist);
      res.redirect("/created-publics");
    } else {
      await Public.create({
        title: title,
        slug: slugify(title),
        body: bodyPublic,
        created_Id: created_id,
        created_userName: created_userName,
        created_avatar: created_avatar,
        views: views,
      });
      req.flash("createdPublicSuccess", createdPublicSuccess);
      res.redirect("/publics");
    }
  },
};
