const database = require("../database/models/index");
const { Trainer } = database.db;

const findTrainerById = async (id) => {
  const findTrainer = await Trainer.findOne({
    where: {
      id,
    },
  });

  return findTrainer;
};

const create = async (data, transaction) => {
  const trainer = await Trainer.create(data, { transaction });
  return trainer;
};

module.exports = { findTrainerById, create };
