import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";
import { WorkoutModel, ExerciseModel } from "../models/Workouts";

const router = express.Router();

// get all user's workouts by userID
router.get("/:userID", verifyToken, async (req: Request, res: Response) => {
  try {
    const response = await UserModel.findById(req.params.userID);
    if (!response) {
      res.json({ message: "User does not exist" });
    }
    if (!response?.workouts) {
      res.json({ message: "User has no workouts" });
    }
    const workouts = await WorkoutModel.find({ _id: response?.workouts });

    res.json(workouts);
  } catch (error) {
    res.json({ message: error });
  }
});

// add workout to week by workoutID and index
router.put("/:userID", verifyToken, async (req: Request, res: Response) => {
  const { workoutID, index } = req.body;
  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      res.json({ message: "User does not exist" });
    }
    const workout = await WorkoutModel.findById(workoutID);
    if (!workout) {
      res.json({ message: "Workout does not exist" });
    }
    if (!Array.isArray(user.schedule[index])) {
      user.schedule[index] = [];
    }

    user?.schedule[index].push(workout);
    await user?.save();
  } catch (error) {
    res.json({ message: error });
  }
});

// delete workout by ID
router.delete(
  "/:workoutID",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const workout = await WorkoutModel.findById(req.params.workoutID);
      if (!workout) {
        return res.json({ message: "Workout does not exist" });
      }
      console.log("workout: " + workout);
      await workout.deleteOne();
      console.log("Workout Deleted Successfully");
      res.json({ message: "Workout Deleted Successfully" });
    } catch (error) {
      res.json({ message: error });
    }
  }
);

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

export { router as workoutRouter };
