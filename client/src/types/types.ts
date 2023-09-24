export type User = {
  username: string;
  email: string;
  age: number;
  currentCalories: number;
  currentProtein: number;
  goalCalories: number;
  goalProtein: number;
  goalWeight: number;
  height: number;
  weight: number;
  workouts: any[];
};

export interface Exercise {
  id: number | string;
  name: string;
  sets: number;
  reps: number;
}

export interface Workout {
  _id: string;
  name: string;
  exercises: Exercise[];
}

export interface ExerciseFormData {
  workoutName: string;
  exerciseName: string;
  sets: number;
  reps: number;
}

export type Height = {
  feet: number;
  inches: number;
};
