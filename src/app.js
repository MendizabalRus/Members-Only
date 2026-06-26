const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("node:path");
const pool = require("./db/pool.js");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const bcrypt = require("bcryptjs");

const router = require("./routes/router.js");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "jesus", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const matchingPasswords = await bcrypt.compare(password, user.password);
      if (!matchingPasswords) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server initialised - http://localhost:${process.env.PORT}`);
});
