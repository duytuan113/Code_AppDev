const database = require("../database/models/index");
const { Account, Role } = database.db;

const findAllByRole = async (roleName) => {
  const accounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: roleName,
      },
    },
  });

  return accounts;
};

const create = async (data, transaction) => {
  const account = await Account.create(data, { transaction });
  return account;
};

const findById = async (id) => {
  const account = await Account.findOne({
    where: {
      id,
    },
  });

  return account;
};

const changePassword = async (id, newPassword) => {
  const newAccount = await Account.update(
    { password: newPassword },
    {
      where: { id },
    }
  );

  return newAccount;
};

module.exports = { findById, changePassword, findAllByRole, create };
