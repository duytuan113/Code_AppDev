const AccountService = require('../services/accountService');

const index = async function (req, res, next) {
    const trainerAccounts  = await AccountService.findAllByRole('trainer');
    res.render("templates/master", {
      title: "Admin Page",
      content: "../admin_view/view_admin",
      trainerAccounts,
    });
  } 

  module.exports = {
    index
  }