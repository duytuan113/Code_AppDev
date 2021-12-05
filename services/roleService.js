const database = require("../database/models/index");
const { Role } = database.db;

const findRoleByName = async (name) => {
  const findTrainer = await Role.findOne({
    where: {
      name,
    },
  });

  return findTrainer;
};

module.exports = { findRoleByName };
