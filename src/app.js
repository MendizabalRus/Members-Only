const express = require("express");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const router = require("./routes/router.js")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "../public"))

app.get("/", router);

app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`Server initialised - http://localhost:${process.env.PORT}`);
})