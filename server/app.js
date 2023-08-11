import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import AuthRoutes from "./routes/AuthRoutes.js";
import AppoinmentRoutes from "./routes/AppoinmentRoutes.js";
import { requireAuth } from "./middleware/AuthMiddleWare.js";
import JobSeekerRoutes from "./routes/JobSeekerRoutes.js";
import JobRoutes from "./routes/JobsRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import session from "express-session";

const app =express();

app.use(morgan("dev"));

app.use(function (req, res, next) {
    res.header("Access-Control-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
const corsOption = {
    origin : "http://localhost:3000",
    credntials:true
};
app.use(express.static("public"));
app.use(cors(corsOption));
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cookieSession({
    name:"session",
    keys:["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
}));

app.use(
    session({
      secret: "appoinment scheduling",
      resave: false,
      saveUninitialized: false,
      rolling: true,
    })
  );
  app.use("/images", express.static("Images/Users"));
  
app.use("/api/v1/auth",AuthRoutes);

app.use("/api/v1/appoinment",requireAuth,AppoinmentRoutes);

app.use("/api/v1/job-seeker",JobSeekerRoutes);

app.use("/api/v1/job-category",requireAuth,JobRoutes);

app.use("/api/v1/user",requireAuth,UserRoutes);

export default app;