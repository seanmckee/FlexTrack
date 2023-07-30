import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";

const router = express.Router();

// get profile
router.get("/:userID", verifyToken, async (req: Request, res: Response) => {
  try {
    const response = await UserModel.findById(req.params.userID);
    if (!response) {
      res.json({ message: "User does not exist" });
    }
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

// update profile
router.put("/:userID", verifyToken, async (req: Request, res: Response) => {
  // takes height in inches
  const { height, weight, age, goalWeight, goalCalories, goalProtein } =
    req.body;
  try {
    const user = await UserModel.findById(req.params.userID);
    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    user.height = height;
    user.weight = weight;
    user.age = age;
    user.goalWeight = goalWeight;
    user.goalCalories = goalCalories;
    user.goalProtein = goalProtein;

    // Save the updated user to the database
    await user.save();
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.json({ message: error });
  }
});

// update calories (positive value adds, negative value subtracts)
router.put(
  "/calories/:userID",
  verifyToken,
  async (req: Request, res: Response) => {
    let { calories } = req.body;

    calories = parseInt(calories);
    try {
      const user = await UserModel.findById(req.params.userID);
      if (!user) {
        return res.json({ message: "User does not exist" });
      }
      user.currentCalories += calories;
      await user.save();
      res.json({ message: "Calories Updated Successfully" });
    } catch (error) {
      res.json({ message: error });
    }
  }
);

// update protein (positive value adds, negative value subtracts)
router.put(
  "/protein/:userID",
  verifyToken,
  async (req: Request, res: Response) => {
    let { protein } = req.body;
    protein = parseInt(protein);
    try {
      const user = await UserModel.findById(req.params.userID);
      if (!user) {
        return res.json({ message: "User does not exist" });
      }
      user.currentProtein += protein;
      await user.save();
      res.json({ message: "Protein Updated Successfully" });
    } catch (error) {
      res.json({ message: error });
    }
  }
);

export { router as profileRouter };
