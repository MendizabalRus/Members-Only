const { Router } = require("express");
const controller = require("../controllers/controller.js");
const router = Router();

router.get("/", controller.getAllPosts);

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/log-in", controller.getLogIn);
router.post("/log-in", controller.postLogIn);

router.get("/log-out", controller.getLogOut);

router.get("/post", controller.getPost);
router.post("/post", controller.postPost);

router.post("/delete-post", controller.postDeletePost);

router.get("/member", controller.getMember)
router.post("/member", controller.postMember)

module.exports = router;
