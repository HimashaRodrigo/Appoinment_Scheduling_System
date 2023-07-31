import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

const app =express();

app.use(morgan("dev"));

app.use((req,res,next)=>{
    res.header("Access-Control-Origin", "*");
    res.header("Access-Controll-Allow-Credentials",true);
    res.header(
        "Access-Controll-Allow-Headers",
        "Origin,X-Request-With, Content-Type, Accept"
    );
    next();
})
const corsOption = {
    origin : "http://localhost:3000",
    credntials:true
};
app.use(cors(corsOption));
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cookieSession({
    name:"session",
    keys:["cyberwolve"],
    maxAge: 24*60*60*100
}));

export default app;