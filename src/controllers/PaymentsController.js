const Profile = require("../model/Profile");
const KeyPix = require("../model/KeyPix");
const TransactionPay = require("../model/TransactionPay");
const { Op } = require("sequelize");

module.exports = {
  async getKeyPix(req, res) {
    const stringidUser = req.user.id;
    const key = await KeyPix.findOne({
      where: { keyPix_IdAluno: stringidUser },
    });
    const profile = await Profile.findOne({
      where: { id: stringidUser },
    });
    const profileTransactions = await TransactionPay.findAll({
      where: {
        [Op.or]: [
          { idPayingStudent: stringidUser },
          { idReceivingStudent: stringidUser },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

     /* console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + profileTransactions
    ); */

    let msgkeynotallowed = req.flash("msgkeynotallowed");
    msgkeynotallowed =
      msgkeynotallowed == undefined || msgkeynotallowed.length == 0
        ? undefined
        : msgkeynotallowed;

    let msgkeyexist = req.flash("msgkeyexist");
    msgkeyexist =
      msgkeyexist == undefined || msgkeyexist.length == 0
        ? undefined
        : msgkeyexist;

    let msgkeysuccess = req.flash("msgkeysuccess");
    msgkeysuccess =
      msgkeysuccess == undefined || msgkeysuccess.length == 0
        ? undefined
        : msgkeysuccess;

    let paySuccess = req.flash("paySuccess");
    paySuccess =
      paySuccess == undefined || paySuccess.length == 0
        ? undefined
        : paySuccess;

    let payFailed = req.flash("payFailed");
    payFailed =
      payFailed == undefined || payFailed.length == 0 ? undefined : payFailed;

    res.render("payments", {
      key: key,
      msgkeynotallowed: msgkeynotallowed,
      msgkeyexist: msgkeyexist,
      msgkeysuccess: msgkeysuccess,
      profile: profile,
      payFailed: payFailed,
      paySuccess: paySuccess,
      profileTransactions: profileTransactions,
    });
  },

  async registerPix(req, res) {
    const stringidUser = req.user.id;
    const keyAluno = req.body.keyPixAluno;
    const keyExist = await KeyPix.findOne({ where: { keyPix: keyAluno } });
    const keyPixAluno = await KeyPix.findOne({
      where: { keyPix_IdAluno: stringidUser },
    });

    let msgkeynotallowed = "Chave não permitida";
    let msgkeyexist = "Essa chave já existi";
    let msgkeysuccess = "Chave cadastrada com sucesso!";

    if (!keyAluno || keyAluno == 0 || keyAluno.indexOf(" ") >= 0) {
      req.flash("msgkeynotallowed", msgkeynotallowed);
      res.redirect("/payments");
    } else if (keyExist) {
      req.flash("msgkeyexist", msgkeyexist);
      res.redirect("/payments");
    } else {
      keyPixAluno.keyPix = keyAluno;
      await keyPixAluno.save();
      req.flash("msgkeysuccess", msgkeysuccess);
      res.redirect("/payments");
    }
    /* console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + keyAluno.indexOf(" ")
    ); */
  },

  async pay(req, res) {
    const stringidUser = req.user.id;
    const keyPixAlunoR = req.body.keyPixAlunoPay;
    const valuePay = Number(req.body.valuePixPay);
    let paySuccess = "Pagamento efetuado com sucesso!";
    let payFailed = "Ops, não foi possível efetuar o pagamento.";
    const keyReceiving = await KeyPix.findOne({
      where: { keyPix: keyPixAlunoR },
    });
    const keyPixAlunoP = await KeyPix.findOne({
      where: { keyPix_IdAluno: stringidUser },
    });

    /* console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + keyReceiving
    ); */

    if (keyReceiving == null) {
      req.flash("payFailed", payFailed);
      res.redirect("/payments");
    }
    const profilePay = await Profile.findOne({
      where: { id: stringidUser },
    });
    const totalProfilePay = profilePay.totalBalance;
    const profileReceiving = await Profile.findOne({
      where: { id: keyReceiving.keyPix_IdAluno },
    });

    if (
      profileReceiving &&
      valuePay > 0 &&
      keyPixAlunoR != keyPixAlunoP.keyPix &&
      valuePay <= totalProfilePay
    ) {
      profilePay.totalBalance = profilePay.totalBalance - valuePay;
      await profilePay.save();

      profileReceiving.totalBalance = profileReceiving.totalBalance + valuePay;
      await profileReceiving.save();

      await TransactionPay.create({
        idPayingStudent: stringidUser,
        idReceivingStudent: profileReceiving.id,
        valueTransaction: valuePay,
        userNamePay: profilePay.userName,
        userNameReceiving: profileReceiving.userName,
      });

      req.flash("paySuccess", paySuccess);
      res.redirect("/payments");
    } else {
      req.flash("payFailed", payFailed);
      res.redirect("/payments");
    }
  },
};
