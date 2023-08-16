import express from "express";
import { ForgotPassword, LoginUser, LogoutUser, PasswordReset, UploadProfileImage, getUserProfile, sendOTP } from "../controllers/AuthControl.js";
import { requireAuth } from "../middleware/AuthMiddleWare.js";
const AuthRoutes = express.Router();

AuthRoutes.route('/login').post(LoginUser);
AuthRoutes.route('/logout').post(LogoutUser);
AuthRoutes.route('/current-user').get(requireAuth,getUserProfile);
AuthRoutes.route('/password-reset').patch(requireAuth,PasswordReset);
AuthRoutes.route('/profile-image').patch(requireAuth,UploadProfileImage);
AuthRoutes.route("/otp").post(sendOTP);
AuthRoutes.route("/forgot-password").patch(ForgotPassword);

export default AuthRoutes;