const monggose=require("mongoose");
// const URI="mongodb://localhost:27017";
const URI=process.env.MONGODB_URI;
monggose.connect(URI)

const connectDb=async()=>{
    try {
        await monggose.connect(URI)
        console.log("Database is connected")
    } catch (error) {   
        console.log("database connection failed")
        process.exit(0)
    }
}


module.exports=connectDb;