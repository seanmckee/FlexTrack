import mongoose, { Schema, Document, Model } from "mongoose";
import { IWorkout } from "./Workouts";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  goalWeight: number;
  goalCalories: number;
  goalProtein: number;
  currentCalories: number;
  currentProtein: number;
  workouts: IWorkout[];
  schedule: IWorkout[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  age: { type: Number, required: false },
  goalWeight: { type: Number, required: false },
  goalCalories: { type: Number, required: false },
  goalProtein: { type: Number, required: false },
  currentCalories: { type: Number, required: false, default: 0 },
  currentProtein: { type: Number, required: false, default: 0 },
  workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
  schedule: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "users",
  UserSchema
);
