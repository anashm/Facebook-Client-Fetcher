const express = require("express");
const res = require("express/lib/response");
const configs = require("./configs");
const routes = require("./routes");
const app = express();
const facebook = require("./controllers");

const mongoose = require("mongoose");

console.debug("[Mongo] Connecting @", configs.mongo.uri);
mongoose.connect(configs.mongo.uri, {
  useNewUrlParser: true,
});

app.use("/", routes);

setInterval(() => {
  let p = new Promise((resolve, reject) => {
    facebook.getPage();
    resolve("succes");
  });
  p.then(() => facebook.getPagePosts())
    .then(() => facebook.getPagePostComments())
    .then(() => facebook.getPostReactions())
    .then(() => facebook.getCommentReactions());
}, 100000);
// facebook.getPagePosts();

app.listen(configs.PORT, () => {
  console.log("[Server] Listening on port:", configs.PORT);
});
