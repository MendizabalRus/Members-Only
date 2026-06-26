const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../../.env")});
const { Pool } = require("pg");

const pool = new Pool({
    connectionString:`postgresql://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
})

module.exports = pool;