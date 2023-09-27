import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UserModel } from "../models/Users.js";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({ username });
  const mail = await UserModel.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists" });
  }

  if (mail) {
    return res.json({ message: "User with given email already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    height: 0,
    weight: 0,
    age: 0,
    goalWeight: 0,
    goalCalories: 0,
    goalProtein: 0,
    schedule: ["rest", "rest", "rest", "rest", "rest", "rest", "rest"],
  });
  await newUser.save();
  res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "User does not exist" });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Email or Password is Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as authRouter };

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
