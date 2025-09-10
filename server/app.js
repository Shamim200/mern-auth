import express from "express";
import cors from "cors";
// import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import dotenv from "dotenv";
const app = express();

dotenv.config({
  path: "./.env", // load env variables
});

// use middlewares
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
app.use(express.static("public"));
// app.use(express.static(path.join(path.resolve(), "public")));
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);

export { app };
