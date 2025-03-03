import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';


import messaageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connecttomongodb.js";
import { app, server } from "./socket/socket.js";
 
 const PORT = process.env.PORT || 5000;

 const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messaageRoutes )
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/Front/dist")))

app.get("*" , (req , res)=>{
    res.sendFile(path.join(__dirname,"Front","dist","index.html"))
})

// app.get("/",(req,res)=>{
//     //root route : http://localhost:5000
//     res.send("hello world");
// })


server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
    
});