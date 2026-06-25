const path = require("node:path")
require("dotenv").config({ path: path.join(__dirname, "../../.env")})
const db = require("../db/queries.js");

//HOME PAGE

async function getAllPosts(req, res) {
  const allPosts = await db.getDbAllPosts();
  res.render("/", {
    posts: allPosts,
  });
}

//REGISTER PAGE

async function getRegister(req, res) {
  res.render("register");
}

async function postRegister(req, res) {
  const user = req.body;
  const register = await db.postDbRegister(
    user.firstName,
    user.lastName,
    user.username,
    user.email,
    user.password,
  );
  res.rediect("/");
}

//LOG-IN PAGE

async function getLogIn(req, res) {
  res.render("log-in");
}

async function postLogIn() {
    //passportjs
}

// POST PAGE

async function getPost(req, res) {
  res.render("post");
}

async function postPost(req, res) {
  const postContent = req.body;
  const post = await db.postDbPost(postContent.title, postContent.body);
  res.redirect("/");
}

// MEMBER PAGE

async function getMember(req, res) {
    res.render("member")
}

async function postMember(req, res) {
    // get the id from the user who is trying to become a member
    const memberPassword = req.body;
    memberPassword === process.env.MEMBERS_PASSWORD ? await db.postDbMember(id) : res.send("Incorrect guess");
}

module.exports = {
  getAllPosts,
  getRegister,
  postRegister,
  getLogIn,
  postLogIn,
  getPost,
  postPost,
  getMember,
  postMember,
};
