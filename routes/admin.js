var express = require("express");
var router = express.Router();
const { db } = require("../database/models/index");
const Sequelize = db.sequelize;
const database = require("../database/models/index");

const { Account, Trainer, Role } = database.db;

/* GET trainer page. */
router.get("/", async function (req, res, next) {
  const trainerAccounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: "trainer",
      },
    },
  });
  res.render("templates/master", {
    title: "Admin Page",
    content: "../admin_view/view_admin",
    trainerAccounts,
  });
});

router.get("/createTrainer", async function (req, res, next) {
  const trainerRole = await Role.findOne({
    where: {
      name: "trainer",
    },
  });

  res.render("templates/master", {
    title: "Create trainer page",
    content: "../trainer_view/create",
    roleId: trainerRole.id,
  });
});

router.post("/addTrainer", async function (req, res, next) {
  // res.send(req.body);

  try {
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

    // create trainer information
    const trainer = await Trainer.create(
      {
        fullName,
        specially,
        age,
        address,
        email,
      },
      { transaction }
    );

    // If create trainer information failed then back to create trainer page
    if (!trainer) {
      await transaction.rollback();
      res.redirect("/admin/createTrainer"); //body guard
    }
    // create trainer account
    const trainerAccount = await Account.create(
      {
        userName,
        password,
        userId: trainer.id,
        roleId,
      },
      { transaction }
    );

    // If create trainer account failed
    if (!trainerAccount) {
      await transaction.rollback();
      res.redirect("/admin/createTrainer");
    }

    // If all handling fine
    await transaction.commit();
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    // await transaction.rollback();
    res.redirect("/admin/createTrainer");
  }
});

router.get("/viewTrainer/:userId", async (req, res) => {
  // res.send(req.params);

  const { userId } = req.params;
  const getTrainer = await Trainer.findOne({
    where: {
      id: userId,
    },
  });
  // res.send(getTrainer);
  res.render("templates/master", {
    title: "View trainer page",
    content: "../trainer_view/view",
    getTrainer,
  });
});

router.get("/deleteTrainer/:id/:userId", async (req, res) => {
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
});

module.exports = router;
