import express from "express";
import { AddJobCategory, getJobCategories, getJobCategoryById, updateJobCategory } from "../controllers/JobsControl.js";

const JobRoutes = express.Router();

JobRoutes.route('/').post(AddJobCategory);
JobRoutes.route('/').get(getJobCategories);
JobRoutes.route('/:id').get(getJobCategoryById);
JobRoutes.route('/:id').patch(updateJobCategory);

export default JobRoutes;