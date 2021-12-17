const { Client } = require('pg');

const data = {
  user: "user",
  host: "localhost",
  database: "online-course-system",
  password: "password",
  port: 5432
};

const client = new Client(data);
client.connect();

module.exports = client;
