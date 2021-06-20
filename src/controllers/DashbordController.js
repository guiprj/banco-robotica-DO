const Profile = require("../model/Profile");
const Product = require("../model/Product");
const Transaction = require("../model/Transaction");

module.exports = {
  async get(req, res) {
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    console.log(profile);
    const products = await Product.findAll();

    let msgInsufficientFunds = req.flash("msgInsufficientFunds");
    msgInsufficientFunds =
      msgInsufficientFunds == undefined || msgInsufficientFunds.length == 0
        ? undefined
        : msgInsufficientFunds;

        let msgRequestSuccess = req.flash("msgRequestSuccess");
        msgRequestSuccess =
        msgRequestSuccess == undefined || msgRequestSuccess.length == 0
        ? undefined
        : msgRequestSuccess;

        let msgInsertQt = req.flash("msgInsertQt");
        msgInsertQt =
        msgInsertQt == undefined || msgInsertQt.length == 0
            ? undefined
            : msgInsertQt;

    return res.render("index", {
      profile: profile,
      products: products,
      msgInsufficientFunds: msgInsufficientFunds, 
      msgRequestSuccess: msgRequestSuccess,
      msgInsertQt: msgInsertQt 
    });
  },

  async getByProduct(req, res) {
    const productId = req.params.id;
    const stringidUser = req.user.id;
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const products = await Product.findAll();
    const product = await Product.findOne({ where: { id: productId } });

    return res.render("byProduct", {
      profile: profile,
      products: products,
      product: product      
    });
  },

  async byProduct(req, res) {
    const stringidUser = req.user.id;
    const productId = req.params.id;
    const qt = req.body.quantity;
    const qtNumber = Number(qt);
    const profile = await Profile.findOne({ where: { id: stringidUser } });
    const product = await Product.findOne({ where: { id: productId } });

    const priceProduct = product.priceProduct;
    const valueProduct = priceProduct * qtNumber;
    let msgInsufficientFunds = "Saldo insuficiente";
    let msgRequestSuccess = "Pedido realizado com sucesso!";
    let msgInsertQt = "Insira a quantidade";

    if (profile.totalBalance < valueProduct) {
      req.flash("msgInsufficientFunds", msgInsufficientFunds);
      res.redirect("/");
    }else if(qtNumber == "" || qtNumber == " " || qtNumber == 0){
      req.flash("msgInsertQt", msgInsertQt);
      res.redirect("/");
    } else {
      const profile = await Profile.findOne({ where: { id: stringidUser } });
      await Transaction.create({
        nameAluno: profile.name,
        usernameAluno: profile.userName,
        classroomAluno: profile.classroom,
        nameItem: product.nameProduct,
        imageItem: product.imageProduct,
        price: product.priceProduct,
        quantity: qtNumber,
        status: 0,
        id_Aluno: stringidUser,
      });

      profile.totalBalance = profile.totalBalance - valueProduct;
      await profile.save();
      req.flash("msgRequestSuccess", msgRequestSuccess);
      res.redirect("/");
    }
  },
};
