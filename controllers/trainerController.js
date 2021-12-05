const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const { Account, Trainer, Role } = database.db;
const RoleService = require("../services/roleService");
const TrainerService = require("../services/trainerService");
const AccountService = require("../services/accountService");

const renderCreateView = async function (req, res, next) {
  const trainerRole = await RoleService.findRoleByName("trainer");

  res.render("templates/master", {
    title: "Create trainer page",
    content: "../trainer_view/create",
    roleId: trainerRole.id,
  });
};

const create = async function (req, res, next) {
  // res.send(req.body);

  try {
    let data;
    const transaction = await Sequelize.transaction();
    const {
      userName,
      password,
      fullName,
      specially,
      age,
      address,
      email,
      roleId,
    } = req.body;

    data = {
      fullName,
      specially,
      age,
      address,
      email,
    };
    // create trainer information
    const trainer = await TrainerService.create(data, transaction);

    // If create trainer information failed then back to create trainer page
    // if (!trainer) {
    //   await transaction.rollback();
    //   res.redirect("/admin/createTrainer");
    // }

    // TODO: Create account info
    data = {
      userName,
      password,
      userId: trainer.id,
      roleId,
    };
    // create trainer account
    const trainerAccount = await AccountService.create(data, transaction);

    // If create trainer account failed
    // if (!trainerAccount) {
    //   await transaction.rollback();
    //   res.redirect("/admin/createTrainer");
    // }

    // If all handling fine
    await transaction.commit();
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.redirect("/admin/createTrainer");
  }
};

const view = async (req, res) => {
  // res.send(req.params);

  const { userId } = req.params;
  const getTrainer = await TrainerService.findTrainerById(userId);
  // res.send(getTrainer);
  res.render("templates/master", {
    title: "View trainer page",
    content: "../trainer_view/view",
    getTrainer,
  });
};

const destroy = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const deleteTransaction = await Sequelize.transaction();
    const deleteTrainer = await Trainer.destroy(
      {
        where: { id: userId },
      },
      { transaction: deleteTransaction }
    );

    // If handling delete Trainer failed
    if (!deleteTrainer) {
      await deleteTransaction.rollback();
      console.log(deleteTransaction);
      res.redirect("/admin");
    }

    const deleteTrainerAccount = await Account.destroy(
      {
        where: { id: id },
      },
      { transaction: deleteTransaction }
    );

    // If handling delete Account failed
    if (!deleteTrainerAccount) {
      await deleteTransaction.rollback();
      res.redirect("/admin");
    }

    // If all handling delete fine
    await deleteTransaction.commit();
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    // await deleteTransaction.rollback();
    res.redirect("/admin");
  }
};

module.exports = {
  renderCreateView,
  create,
  view,
  destroy,
};
