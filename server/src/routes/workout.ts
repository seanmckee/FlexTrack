import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";
import { WorkoutModel, ExerciseModel } from "../models/Workouts";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.json({ message: error });
  }
});

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
    await newWorkout.save();
    user.workouts.push(newWorkout);
    await user.save();
    res.json({ message: "Workout Created and added to User Successfully" });
  } catch (error) {
    res.json({ message: error });
  }
});

// create new exercise
router.post(
  "/:userID/:workoutID",
  verifyToken,
  async (req: Request, res: Response) => {
    const { name, setNumber } = req.body;
    try {
      const workout = await WorkoutModel.findById(req.params.workoutID);
      if (!workout) {
        return res.json({ message: "Workout does not exist" });
      }
      const user = await UserModel.findById(req.params.userID);
      if (!user) {
        return res.json({ message: "User does not exist" });
      }
      const newExercise = new ExerciseModel({
        name,
        setNumber,
      });

      workout.exercises.push(newExercise);
      await workout.save();
      res.json({
        message: "Exercise Created and added to Workout Successfully",
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
);

export { router as workoutRouter };
