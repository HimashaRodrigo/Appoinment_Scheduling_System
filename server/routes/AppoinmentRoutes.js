import express from "express";
import { AddAppoinment, cancelAppoinment, getAppoinments } from "../controllers/AppoinmentControl.js";


const AppoinmentRoutes = express.Router();

AppoinmentRoutes.route('/').post(AddAppoinment);
AppoinmentRoutes.route('/').get(getAppoinments);
AppoinmentRoutes.route('/:id').patch(cancelAppoinment);

export default AppoinmentRoutes;