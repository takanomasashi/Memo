var express = require("express");
var router = express.Router();
url = require("url");
var fs = require("fs");

// showmemoにgetでアクセスしてきたときの表示の処理//
router.get("/", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var n = query.id;

  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);

  res.render("showmemo.ejs", {
    title: "メモアプリ",
    content_title: memos[n - 1].title,
    content_body: memos[n - 1].body,
    url: "onclick=location.href='/editmemo?id=" + n + "'>",
    id: n
  });
});

module.exports = router;
