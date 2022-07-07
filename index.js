const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const postRoute = require("./server/routes/post");
const userRoute = require("./server/routes/user");
const followRoute = require("./server/routes/follow");
require("dotenv").config();

const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected!!"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/follow", followRoute);
// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/public/", "index.html"))
// );

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "/view/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "view", "build", "index.html"))
  );
} else app.use(express.static(__dirname + "/view/public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
