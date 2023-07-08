//IMPORT FROM PACKAGES
const express = require("express");

//IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth")

//INIT
const PORT = 3000;
const app = express();


app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is runing on port => ${PORT}`)
})