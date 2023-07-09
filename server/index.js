//IMPORT FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser"); // Add this line

//IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth")

//INIT
const PORT = 3000;
const app = express();
const DB = process.env.DB

//MIDDLEWARE
app.use(bodyParser.json()); // Add this line 
app.use(authRouter);

//CONNECTIONS
mongoose.connect(DB).then(() => {
    console.log("Connection is successful");
}).catch(e => {
    console.log(e);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port => ${PORT}`) 
})
