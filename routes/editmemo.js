var express = require("express");
var router = express.Router();
url = require("url");
var fs = require("fs");

// editmemoにgetでshowmemoからアクセスしてきたときの処理//
router.get("/", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var n = query.id;

  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);

  res.render("editmemo", {
    title: "メモアプリ",
    content_body: memos[n - 1].body,
    id: n
  });
});

module.exports = router;
