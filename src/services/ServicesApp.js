const Profile = require("../model/Profile");
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
  }
};

module.exports = AppSearch;
