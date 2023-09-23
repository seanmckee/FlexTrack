import mongoose, { Schema, Document } from "mongoose";

interface IWorkout extends Document {
  name: string;
  exercises: IExercise[];
}

interface IExercise extends Document {
  name: string;
  sets: number;
  reps: number;
}

const ExerciseSchema: Schema<IExercise> = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
});

const WorkoutSchema: Schema<IWorkout> = new Schema({
  name: { type: String, required: true },
  exercises: [ExerciseSchema],
});

// Define and export the models

const ExerciseModel = mongoose.model<IExercise>("Exercise", ExerciseSchema);
const WorkoutModel = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export { ExerciseModel, WorkoutModel };

export type { IWorkout, IExercise };
