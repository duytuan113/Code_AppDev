var express = require("express");
var router = express.Router();
const { db } = require("../database/models/index");
const Sequelize = db.sequelize;
const database = require("../database/models/index");

const { Account, Trainer, Role } = database.db;
const TrainerController = require("../controllers/trainerController");
const AccountController = require("../controllers/accountController");
const AdminController = require("../controllers/adminController");

// !** GET trainer page.
router.get("/", AdminController.index);

// !*  GET create trainer page.
router.get("/createTrainer", TrainerController.renderCreateView);

// !* Process when creating a trainer
router.post("/addTrainer", TrainerController.create);

// !* Get view trainer page
router.get("/viewTrainer/:userId", TrainerController.view);

// !* Function to delete the trainer on trainer and account table
router.get("/deleteTrainer/:id/:userId", TrainerController.destroy);

// !* Function to change password of trainer and staff
router.get("/changePass/:id", AccountController.renderPassword);

// !* Update Password
router.post("/updatePass", AccountController.updatePassWord);

module.exports = router;
