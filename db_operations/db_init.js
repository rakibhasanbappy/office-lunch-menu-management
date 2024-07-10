const { Client } = require("pg");
require("dotenv").config();

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

const createItemTableQuery = `
CREATE TABLE IF NOT EXISTS item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  availability BOOLEAN NOT NULL DEFAULT FALSE
);
`;

async function initializeDB() {
  const client = new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
  });

  try {
    await client.connect();
    await client.query(createUsersTableQuery);
    await client.query(createItemTableQuery);
    console.log("Database Initialized Successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await client.end();
  }
}

initializeDB();

// module.exports = initializeDB;
