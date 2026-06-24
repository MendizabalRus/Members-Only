const db = require("../db/queries.js");

async function getAllPosts(req, res) {
    const allPosts = db.getDbAllPosts();
    res.render("/", {
        title: "FEED",
        posts: allPosts,
    })
}

module.exports = {
    getAllPosts,
}