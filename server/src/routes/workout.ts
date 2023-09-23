import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";
import { WorkoutModel, ExerciseModel } from "../models/Workouts";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const response = await UserModel.findById(req.params.userID);
    if (!response) {
      res.json({ message: "User does not exist" });
    }
    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

// create new workout
router.post("/:userID", verifyToken, async (req: Request, res: Response) => {
  const { name, exercises } = req.body;
  console.log("exercises: " + JSON.stringify(exercises) + " name: " + name);

  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    if (!Array.isArray(exercises)) {
      return res
        .status(400)
        .json({ message: "Exercises must be an array of objects" });
    }
    const newWorkout = new WorkoutModel({
      name,
      exercises,
    });
    console.log("new workout: " + newWorkout);
    console.log("workout created");
    await newWorkout.save();
    console.log("workout saved");
    user.workouts.push(newWorkout);
    console.log("workout added to user");
    await user.save();
    console.log("Workout Created and added to User Successfully");
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
