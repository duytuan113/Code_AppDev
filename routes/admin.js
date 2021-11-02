var express = require("express");
var router = express.Router();

/* GET admin page. */
router.get("/", function (req, res, next) {
  res.render("templates/master", {
    title: "Admin Page",
    content: "../admin_view/index",
  });
});

router.get("/createTrainer", function (req, res, next) {
  res.render("templates/master", {
    title: "Admin Page",
    content: "../admin_view/create",
  });
});

module.exports = router;
