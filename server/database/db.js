const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const DBconnection = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try{
        await mongoose.connect(MONGO_URI);  // { userNewUrlParser : true}
        console.log("MongoDb Connected successfully");
    }
    catch(error){
        console.log("Error while connecting to mongodb", error.message);
        process.exit(1);
    }
}

module.exports = {DBconnection}