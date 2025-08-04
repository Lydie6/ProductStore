import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose"
import path from "path";
import routesProduct from "./routes/product.route.js";
dotenv.config();
console.log("MONGO_URI from .env:", process.env.MONGO_URI); 
const __dirname=path.resolve();
const app = express();
app.use(express.json());

app.use("/api/products", routesProduct);
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
  })
}

const startServer = async () => {
    try {
      await connectDB(); 
      app.listen(8080, () => {
        console.log("Server started at http://localhost:8080");
      });
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1); 
    }
  };
  
  startServer(); 
  