import cookieParser from "cookie-parser";
import express from "express";
import { Request, Response } from "express";
import { NOT_FOUND } from "http-status-codes";
import path from "path";
import BaseRouter from "./routes";

// Init express
const cors = require("cors");
const app = express();

// Add middleware/settings/routes to express.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", BaseRouter);

const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
app.get("**", (req: Request, res: Response) => {
  res.status(NOT_FOUND);
});

// Export express instance
export default app;
