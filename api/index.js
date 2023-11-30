import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import monumentsRoute from "./routes/monuments.js"
import userRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import bookingRoute from "./routes/bookingorder.js"
import AdminRoute from "./routes/admin.js"
import cookieParser from "cookie-parser"


const app = express();
dotenv.config();



mongoose.set('strictQuery', true);
const connect = async()=> {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log(("connected to db"))
    }catch(error){
        console.log("Not connected")
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})




app.use(cookieParser())
                                //  default middlewares
app.use(express.json())                 





app.use("/api/monuments",monumentsRoute);
app.use("/api/users", userRoute)
                                                    //  using other files as library
app.use("/api/auth", authRoute)
app.use("/api/bookingorder", bookingRoute)
app.use("/api/admin", AdminRoute)





app.use((err, req, res, next)=>{
    const errorStatus = err.status ||500
    const errormsg = err.message ||"Something went wrong"

    return res.status(errorStatus).json({
        success : false,
        status:errorStatus,
        message: errormsg,
        stack : err.stack,
    })
})







app.listen(process.env.PORT || 5000, ()=>{
    connect();
    console.log("Listening to 5000");
})