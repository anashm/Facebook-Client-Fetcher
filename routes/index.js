const Router = require("express").Router;
const router = new Router();
const facebook = require("../controllers");

router.get("/page/:pageId", facebook.getPage);

router.get("/page/:pageId/posts", facebook.getPagePosts);

router.get("/post/:postId/comments", facebook.getPagePostComments);

router.get("/post/:postId/reactions", facebook.getPostReactions);

router.get("/comment/:commentId/reactions", facebook.getCommentReactions);

router.get("/user/:userId/profile", facebook.getUserProfile);

router.get("/page/:pageId/insights", facebook.getPageInsights);

router.get("/post/:postId/insights", facebook.getPostInsights);

module.exports = router;
