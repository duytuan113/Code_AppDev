var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("templates/master", {
    title: "Index Page",
    content: "../admin_view/index",
  });
});

/* GET admin bootstrap page. */
router.get("/", function (req, res, next) {
  res.render("templates_bootstrap/_master", {
    title: "Index Page",
    content: "../admin_view/index",
  });
});

module.exports = router;
