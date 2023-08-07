import express from "express";
import { LoginUser, LogoutUser, PasswordReset, getUserProfile } from "../controllers/AuthControl.js";
import { requireAuth } from "../middleware/AuthMiddleWare.js";
const AuthRoutes = express.Router();

AuthRoutes.route('/login').post(LoginUser);
AuthRoutes.route('/logout').post(LogoutUser);
AuthRoutes.route('/current-user').get(requireAuth,getUserProfile);
AuthRoutes.route('/password-reset').patch(requireAuth,PasswordReset);

export default AuthRoutes;