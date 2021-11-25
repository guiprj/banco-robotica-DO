const Profile = require("../model/Profile");
const Transaction = require("../model/Transaction");
const { Op } = require("sequelize");

const AppSearch = {
  async search(query) {
    try {
      let appSearchStudants = await Profile.findAll({
        where: {
          [Op.or]: [{ name: query }, { userName: query }, {classroom: query}],
        },
      });
      return appSearchStudants;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async searchRequest(query) {
    console.log(query)
    try {
      let appSearchRequests = await Transaction.findAll({
        where: {
          [Op.or]: [{ nameAluno: query }, { usernameAluno: query }, {classroomAluno: query}, {status: query}],
        },
      });
      return appSearchRequests;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
};

module.exports = AppSearch;
