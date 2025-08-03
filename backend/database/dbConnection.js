import mongoose from "mongoose"; //just mongoose import!
import dotenv from "dotenv"
dotenv.config()

//Database connection here!
 const dbConnection  =async ()=>{
    console.log("🌐 Connecting to:", process.env.MONGO_URI); // debug
   await mongoose.connect(process.env.MONGO_URI,{
       dbName: "Job_Portal"

    }).then(()=>{ //agar connect ho jaye toh!
       console.log("MongoDB Connected Sucessfully !")
    }).catch((error)=>{
        console.log(`Failed to connect ${error}`) //warna error de do console me!
    })
    
}
export default dbConnection;