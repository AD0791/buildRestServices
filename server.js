const express = require("express");
const app = express();

const data = require("./mock.json");

app.get("/", (req, res) => {
  res.json(data);
});

// env variables
// terminal: $export PORT=5000
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Port is open ${port}`);
});
