import express from "express";
import { AddJobCategory, getJobCategories, getJobCategoryById, updateJobCategory } from "../controllers/JobsControl.js";
import { requireAuth } from "../middleware/AuthMiddleWare.js";

const JobRoutes = express.Router();

JobRoutes.route('/').post(requireAuth,AddJobCategory);
JobRoutes.route('/').get(getJobCategories);
JobRoutes.route('/:id').get(requireAuth,getJobCategoryById);
JobRoutes.route('/:id').patch(requireAuth,updateJobCategory);

export default JobRoutes;