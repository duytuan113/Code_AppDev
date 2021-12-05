const database = require("../database/models/index");
const AccountService = require("../services/accountService");

const renderPassword = async (req, res) => {
  const { id } = req.params;

  const account = await AccountService.findById(id);

  res.render("templates/master", {
    title: "Change Password",
    content: "../account_view/changePass",
    account,
  });
};

const updatePassWord = async (req, res) => {
  const { id, newPassword, confirmPassword } = req.body;

  // Validation: check password
  if (newPassword !== confirmPassword) {
    return res.redirect(`/admin/changePass/${id}`);
  }

  const newAccount = await AccountService.changePassword(id, newPassword);

  return res.redirect("/admin");
};

module.exports = { renderPassword, updatePassWord };
