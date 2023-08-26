import express from "express";
import { AddAppoinment, cancelAppoinment, finishAppoinment, getAppoinmentById, getAppoinments } from "../controllers/AppoinmentControl.js";


const AppoinmentRoutes = express.Router();

    AppoinmentRoutes.route('/').post(AddAppoinment);
    AppoinmentRoutes.route('/').get(getAppoinments);
    AppoinmentRoutes.route('/:id').patch(cancelAppoinment);
    AppoinmentRoutes.route('/:id').get(getAppoinmentById);
    AppoinmentRoutes.route('/close/:id').patch(finishAppoinment);

export default AppoinmentRoutes;