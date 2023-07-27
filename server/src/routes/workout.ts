import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";
import { WorkoutModel, ExerciseModel } from "../models/Workouts";

const router = express.Router();

// create new workout
router.post("/:userID", verifyToken, async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    const newWorkout = new WorkoutModel({
      name,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

// create new exercise
router.post(
  "/:userID/:workoutID",
  verifyToken,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
    } catch (error) {
      res.json({ message: error });
    }
  }
);
