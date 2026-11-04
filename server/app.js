import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js";
import dotenv from "dotenv";
import helmet from "helmet";
import { globalRateLimitConfig } from "./src/config/rateLimitConfig.js";
const app = express();

dotenv.config({
  path: "./.env", // load env variables
});

// use middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);
app.use(globalRateLimitConfig);
app.use(
  cors({
    origin: process.env.cors,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "100kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.static("./server/public/temp"));

app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);

export { app };
