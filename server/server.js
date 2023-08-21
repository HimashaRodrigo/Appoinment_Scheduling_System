import mongoose from "mongoose";
import app from "./app.js";

const mongoDB = "mongodb+srv://acfernando1999:9tip9QsrEzfpDTPa@cluster0.9zyyong.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

mongoose.set("strictQuery",false);
mongoose.connect(mongoDB).then(()=>{
    console.log(`Server is listning to port ${PORT}`);
    app.listen(PORT);
}).catch((err)=>{
    console.log(err);
})

