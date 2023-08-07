import express from "express";
import { createSeekerAccount, updateSeekerAccount } from "../controllers/JobSeekerControl.js";
import { requireAuth } from "../middleware/AuthMiddleWare.js";

const JobSeekerRoutes = express.Router();

JobSeekerRoutes.route('/').post(createSeekerAccount);
JobSeekerRoutes.route('/:id').patch(requireAuth,updateSeekerAccount);

export default JobSeekerRoutes;