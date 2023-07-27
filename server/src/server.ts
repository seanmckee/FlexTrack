import cors from "cors";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const connection = process.env.CONNECT;
console.log("Connection String:", connection);
console.log("Port: ", port);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

mongoose.connect(connection!);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
