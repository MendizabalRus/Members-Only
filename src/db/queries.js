const pool = require("./pool.js");

async function getDbAllPosts() {
    const { rows } = await pool.query("SELECT * FROM ")
}

module.exports = {
    getDbAllPosts,
}