import { Router } from "express";
import TodosRouter from "./Todos";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/todos", TodosRouter);

// Export the base-router
export default router;
