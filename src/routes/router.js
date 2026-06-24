const { Router } = require("express");
const controller = require("../controllers/controller.js")
const router = Router();

router.get("index", controller.getAllPosts)

module.exports = router;