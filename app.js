// import
const express = require("express");
const cors = require("cors");

// config
const app = express();
const port = process.env.PORT || 8000;

// middlware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("working");
});
app.use("/api/v1", require("./versions/v1/routes/index"));

// listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
