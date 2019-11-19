var express = require("express");
var router = express.Router();

// Newmemoにgetでアクセスしてきたときの処理//
router.get("/", function(req, res) {
  res.render("newmemo", { title: "メモアプリ" });
});

module.exports = router;
