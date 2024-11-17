import express from "express";
import { createCronjob } from "../controllers/cronjobController.js";
const cronRoute = express.Router();

cronRoute.post("/create", createCronjob);

export default cronRoute