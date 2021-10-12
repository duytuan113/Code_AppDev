"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("Accounts", {
      fields: ["roleId"],
      type: "foreign key",
      name: "custom_fKey_constraint_roleId",
      references: {
        //Required field
        table: "Roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Accounts",
      "custom_fKey_constraint_roleId"
    );
  },
};
