import express from "express";
import { createUserAccounts, UpdateUserByAdmin, getUsers, getUsersByRole, updateUserAccount } from "../controllers/UserControl.js";

const UserRoutes = express.Router();

UserRoutes.route('/').post(createUserAccounts);
UserRoutes.route('/').get(getUsers);
UserRoutes.route('/:Role').get(getUsersByRole);
UserRoutes.route('/:id').patch(updateUserAccount);
UserRoutes.route('/').patch(UpdateUserByAdmin);

export default UserRoutes;