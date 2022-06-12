const express = require("express")
const app = express()
const mongoose = require("mongoose");
const path = require("path")
const postRoute = require("./server/routes/post")
const userRoute = require("./server/routes/user")
require('dotenv').config()




const uri = process.env.MONGO_URL;

mongoose.connect(
        uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    ).then(console.log("DB Connected!!"))
    .catch(error => console.log(error));

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use("/post", postRoute)
app.use("/user", userRoute)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public", "index.html")))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))