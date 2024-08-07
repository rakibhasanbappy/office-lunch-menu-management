const get_client = require("./get_client");

// create a user
async function createUser(newUser) {
  try {
    const client = await get_client();
    const { rows } = await client.query(
      `INSERT INTO users (email, name, password) VALUES($1, $2, $3) RETURNING *`,
      [newUser.email, newUser.name, newUser.password]
    );
    return rows;
  } catch (err) {
    return err;
  }
}

// get user by email
async function getUserByEmail(email) {
  try {
    const client = await get_client();
    const { rows } = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows;
  } catch (err) {
    return err;
  }
}

// modlue exports
module.exports = {
  createUser,
  getUserByEmail,
};
