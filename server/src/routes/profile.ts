import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "./auth";
import { UserModel } from "../models/Users";

const router = express.Router();

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
    // await user.updateOne(
    //   { _id: req.params.userID },
    //   { height, weight, age, goalWeight, goalCalories, goalProtein }
    // );
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

export { router as profileRouter };
