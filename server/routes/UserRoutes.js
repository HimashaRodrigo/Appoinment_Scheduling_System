import express from "express";
import { createUserAccounts, deactivateUser, getUsers, getUsersByRole, updateUserAccount } from "../controllers/UserControl.js";

const UserRoutes = express.Router();

UserRoutes.route('/').post(createUserAccounts);
UserRoutes.route('/').get(getUsers);
UserRoutes.route('/:Role').get(getUsersByRole);
UserRoutes.route('/activation/:id').patch(deactivateUser);
UserRoutes.route('/:id').patch(updateUserAccount);

export default UserRoutes;