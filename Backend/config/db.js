const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    });
    console.log("MongoDB Connected✅.........");
    }
    catch(err){
        console.log("MongoDb Connection Failed❌.........",err);
        process.exit(1)
    }
}

module.exports = connectDb

