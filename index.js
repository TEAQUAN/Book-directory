const winston = require("winston");
const express = require("express")
const mongoose = require("mongoose")
const app = express()



require("./startup/routes")(app)

mongoose.connect(`mongodb://localhost/Book`).then(()=> console.log("Connected to Mongo"))// mongoose.conntect returns a database
.catch(err => console.error(`could not connect to ${err}`))











//PORT
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    winston.info(`listening on port ${port}`);
});

module.exports = server;
