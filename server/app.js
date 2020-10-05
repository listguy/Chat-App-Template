const express = require("express");

const app = express();

app.use(express.json());

/* Enter code Below */
const messages = [];

app.get("/messages", async (req, res) => {
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const { body } = req;
  console.log(body);
  messages.push(body);
  res.send("sent");
});

/* Enter code Above */

module.exports = app;
