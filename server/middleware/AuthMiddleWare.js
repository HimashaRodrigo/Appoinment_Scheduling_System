import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import JobSeeker from "../models/JobSeeker.js";
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "appoinment scheduling", async (err, decodetoken) => {
      if (err) {
        res.status(400).json({
          status: "ERROR",
          message: err.message,
        });
      } else {
        req.user =
          (await User.findById(decodetoken.id)) ||
          (await JobSeeker.findById(decodetoken.id));
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
