const { Client } = require("pg");
require("dotenv").config();

const client = async function () {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false,
  });
  try {
    await client.connect();
    const res = await client.query("SELECT $1::text as message", [
      "Hello world!",
    ]);
    console.log(res.rows[0].message);
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export the module
module.exports = client;
