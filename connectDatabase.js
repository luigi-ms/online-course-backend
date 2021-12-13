const {Client} = require('pg');

const data = {
  user: "u0_a440",
  host: "localhost",
  database: "online-course-system",
  password: "",
  port: 5432
};

const client = new Client(data);
client.connect();

module.exports = client;
