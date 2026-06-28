const pool = require("./pool.js");

async function getDbAllPosts() {
  const { rows } = await pool.query("SELECT posts.id, posts.title, posts.body, users.firstname, users.lastname, users.username FROM posts JOIN users ON posts.user_id = users.id");
  console.log(rows)
  return rows;
}

async function postDbRegister(firstName, lastName, username, email, password) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, email, password],
  );
}

async function postDbPost(title, body, userId) {
    await pool.query("INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)", [title, body, userId])
}

async function postDbMember(id) {
  console.log("is the problem in the query?");
  await pool.query("UPDATE users SET is_member = true WHERE id = $1", [id]);
}

module.exports = {
  getDbAllPosts,
  postDbRegister,
  postDbPost,
  postDbMember,
};
