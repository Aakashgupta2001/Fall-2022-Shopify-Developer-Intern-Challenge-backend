const express = require("express");
const app = express();
const mongo = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors());

//connecting mongoose
mongo.connect(process.env.MONGO_CONNECT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("connected to mongo");
});

//routes
//frontend linking
const path = __dirname + "/app/views/";
console.log(path);
app.use(express.static(path));
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

//backend routes
require("./app/routes/routes").default(app);

//starting server
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port", port);
});
