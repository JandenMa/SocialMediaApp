const mongoose = require('mongoose');
const { getConfigJson } = require('../utils/common');


const dbConnection = {
    connect: () => {
        const config = getConfigJson();
        if (!config || !config.mongodb) {
            throw (new Error("Error: Config is undefined"));
        }
        const conn_url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.address}:${config.mongodb.port}/${config.mongodb.db}`;
        mongoose.connect(process.env.MONGODB_URL || conn_url, 
            { useNewUrlParser: true, useCreateIndex: true, });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('connected', () => {
            console.log('MongoDB connection open');
        }).on('error', err => {
            console.log(err);
        })
    },

    disConnect: () => {
        mongoose.disconnect(() => {
            console.log('MongoDB connection close');
        }, err => {
            console.log(err)
        })
    }
}

module.exports = dbConnection;



