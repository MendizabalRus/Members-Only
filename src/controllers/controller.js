const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const db = require("../db/queries.js");
const passport = require("passport");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

// validation arrays

const validateRegister = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is REQUIRED!")
    .isAlpha()
    .withMessage("First name must ONLY contain letters!"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is REQUIRED!")
    .isAlpha()
    .withMessage("Last name must ONLY contain letters!"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is REQUIRED!")
    .isAlphanumeric()
    .withMessage("Username must ONLY contain letters and numbers!"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail is REQUIRED!")
    .isEmail()
    .withMessage("E-mail must be VALID!"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is REQUIRED")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be BETWEEN 8 and 30 characters long!")
    .isAscii()
    .withMessage(
      "Password must ONLY contain letters, numbers, symbols and punctuation marks (ASCII characters only)! Example: A1.g3$q9,@",
    ),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Passwords do NOT match!");
      }
      return true;
    }),
];

const validatePost = [
  body("title")
    .isLength({ min: 10, max: 100 })
    .notEmpty()
    .withMessage("Title is REQUIRED!"),
  body("body").notEmpty().withMessage("Post cannot be empty!"),
];

//HOME PAGE

async function getAllPosts(req, res) {
  const allPosts = await db.getDbAllPosts();
  res.render("index", {
    posts: allPosts,
    user: req.user,
  });
}

//REGISTER PAGE

async function getRegister(req, res) {
  res.render("register", {
    user: req.user,
  });
}

const postRegister = [
  validateRegister,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
      });
    }
    try {
      const { firstName, lastName, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const register = await db.postDbRegister(
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
];

//LOG-IN PAGE

async function getLogIn(req, res) {
  res.render("log-in", {
    user: req.user,
  });
}

const postLogIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: true,
});

// LOG OUT

async function getLogOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// POST PAGE

async function getPost(req, res) {
  res.render("post", {
    user: req.user,
  });
}

const postPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("post", {
        errors: errors.array(),
      });
    }
    const { title, body } = req.body;
    const userId = req.user.id;
    await db.postDbPost(title, body, userId);
    res.redirect("/");
  },
];

// MEMBER PAGE

async function getMember(req, res) {
  res.render("member", {
    user: req.user,
  });
}

async function postMember(req, res) {
  const id = req.user.id;
  console.log(id)
  console.log(req.body)
  const memberPassword = req.body.memberPassword;
  memberPassword === process.env.MEMBERS_PASSWORD
    ? await db.postDbMember(id)
    : res.send("Incorrect guess");
  res.redirect("/")
}

module.exports = {
  getAllPosts,
  getRegister,
  postRegister,
  getLogIn,
  postLogIn,
  getLogOut,
  getPost,
  postPost,
  getMember,
  postMember,
};
