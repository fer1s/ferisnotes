const mongoose = require("mongoose")

function connect(databaseIP) {
    mongoose.connect(databaseIP, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log("database connected")).catch(err => console.log("database errror: " + err));
}

function disconnect() {
    mongoose.connection.close().then(() => console.log('database successfully disconnected')).catch(err => console.log("database errror: " + err));
}

module.exports = {
    connect,
    disconnect
}