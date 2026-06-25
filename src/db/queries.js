const pool = require("./pool.js");

async function getDbAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function postDbRegister(firstName, lastName, username, email, password) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, email, password],
  );
}

async function postDbPost(title, body) {
    await pool.query("INSERT INTO posts (title, body) VALUES ($1, $2)", [title, body])
}

async function postDbMember(id) {
  await pool.query("UPDATE FROM users SET is_member = true WEHRE id = $1", [
    id,
  ]);
}

module.exports = {
  getDbAllPosts,
  postDbRegister,
  postDbPost,
  postDbMember,
};
