import mongoose from "mongoose";
import app from "./app.js";

const mongoDB = "mongodb+srv://acfernando1999:3gQiP45hrgQmuBmg@cluster0.9zyyong.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

mongoose.set("strictQuery",false);
mongoose.connect(mongoDB).then(()=>{
    console.log(`Server is listning to port ${PORT}`);
    app.listen(PORT);
}).catch((err)=>{
    console.log(err);
})

// mongodb+srv://himasharodrigo1998:Ha5o68aesYgysTNb@cluster0.dttmmiz.mongodb.net/?retryWrites=true&w=majority
