var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
url = require("url");
var fs = require("fs");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Indexにgetでアクセスしてきたときの処理//
router.get("/", function(req, res) {
  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);
  var memos_data2 = "";
  for (var i = 0; i < memos.length; i++) {
    memos_data2 =
      memos_data2 +
      "<li><a href='/showmemo?id=" +
      (i + 1) +
      "'>" +
      memos[i].title +
      "</a></li>";
  }
  res.render("index.ejs", { title: "メモアプリ", content: memos_data2 });
});

// Indexにpostでアクセスしてきたときの処理//
router.post("/", function(req, res) {
  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);

  var id_data = memos[memos.length - 1].id;
  var tmp = {
    id: id_data + 1,
    title: "メモ" + (id_data + 1),
    body: req.body.message
  };

  memos.push(tmp);
  var memos_data = JSON.stringify(memos);
  fs.writeFile("./views/mydata.txt", memos_data, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

// Indexにdeleteでアクセスしてきたときの処理//
router.delete("/", function(req, res) {
  var deleted_number = req.body.deleted;

  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);
  memos.splice(deleted_number - 1, 1);
  var memos_data = JSON.stringify(memos);
  fs.writeFile("./views/mydata.txt", memos_data, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

// Indexにpatchでアクセスしてきたときの処理//
router.patch("/", function(req, res) {
  var edited_number = req.body.edited;
  console.log(edited_number);

  var text = fs.readFileSync("./views/mydata.txt");
  var memos = JSON.parse(text);

  var tmp = {
    id: edited_number * 1,
    title: "メモ" + edited_number * 1,
    body: req.body.message
  };

  memos.splice(edited_number - 1, 1, tmp);
  var memos_data = JSON.stringify(memos);
  fs.writeFile("./views/mydata.txt", memos_data, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

module.exports = router;
