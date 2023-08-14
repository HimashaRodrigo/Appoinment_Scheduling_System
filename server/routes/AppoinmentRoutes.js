import express from "express";
import { AddAppoinment, cancelAppoinment, getAppoinmentById, getAppoinments } from "../controllers/AppoinmentControl.js";


const AppoinmentRoutes = express.Router();

AppoinmentRoutes.route('/').post(AddAppoinment);
AppoinmentRoutes.route('/').get(getAppoinments);
AppoinmentRoutes.route('/:id').patch(cancelAppoinment);
AppoinmentRoutes.route('/:id').get(getAppoinmentById);

export default AppoinmentRoutes;