const Transaction = require("../model/Transaction");
const Profile = require("../model/Profile");

module.exports = {
  async getTransactions(req, res) {
    const stringidUser = req.user.id;
    const admin = stringidUser === 1;
    const transactions = await Transaction.findAll();

    if (!admin) {
      res.redirect("/");
    }

    return res.render("requests", { transactions: transactions });
  },

  async updateTransaction(req, res) {
    const statusId = req.body.statusId;

    const transaction = await Transaction.findOne({ where: { id: statusId } });
    transaction.status = 1;
    await transaction.save();

    return res.redirect("/admin/requests");
  },

  async deleteTransaction(req, res) {
    const idDelTransaction = req.body.id_TransactionDel;

    if(idDelTransaction !== undefined){
      if(!isNaN(idDelTransaction)){
       await Transaction.destroy({where: {id: idDelTransaction}})
        res.redirect("/admin/requests");
      }else{
        res.redirect("/admin/requests");
      }
    }else{
      res.redirect("/admin/requests");
    }
  },
};
