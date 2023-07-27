import mongoose, { Schema, Document } from "mongoose";

interface IWorkout extends Document {
  name: string;
  exercises: IExercise[];
}

interface IExerciseSet {
  setNumber: number;
  done: boolean;
  reps: number;
  weight: number;
}

interface IExercise extends Document {
  name: string;
  sets: IExerciseSet[];
}

const ExerciseSetSchema: Schema<IExerciseSet> = new Schema({
  setNumber: { type: Number, required: true },
  done: { type: Boolean, required: true, default: false }, // Default value is false, indicating the set is not done initially
  reps: { type: Number, required: true },
  weight: { type: Number, required: false, default: 0 },
});

const ExerciseSchema: Schema<IExercise> = new Schema({
  name: { type: String, required: true },
  sets: [ExerciseSetSchema],
});

const WorkoutSchema: Schema<IWorkout> = new Schema({
  name: { type: String, required: true },
  exercises: [ExerciseSchema],
});

// Define and export the models
const ExerciseSetModel = mongoose.model<IExerciseSet>(
  "ExerciseSet",
  ExerciseSetSchema
);
const ExerciseModel = mongoose.model<IExercise>("Exercise", ExerciseSchema);
const WorkoutModel = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export { ExerciseSetModel, ExerciseModel, WorkoutModel };

export type { IWorkout, IExercise, IExerciseSet };
