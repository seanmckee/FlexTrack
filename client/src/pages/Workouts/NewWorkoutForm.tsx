import React from "react";
import { ExerciseFormData } from "../../types/types";

type ChildProps = {
  formData: ExerciseFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExerciseFormData>>;
  addExercise: () => void;
};

const NewWorkoutForm: React.FC<ChildProps> = ({
  formData,
  setFormData,
  addExercise,
}) => {
  return (
    <div>
      <form className="flex flex-col items-center">
        <label className="label">
          <span className="label-text">Workout Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={formData.workoutName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, workoutName: e.target.value }))
          }
        />

        <div className="border p-4 rounded-lg mt-4">
          <div className="my-1">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={formData.exerciseName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  exerciseName: e.target.value,
                }))
              }
            />
          </div>

          <div className="my-1">
            <label className="label">
              <span className="label-text">Sets</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={formData.sets}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sets: e.target.valueAsNumber,
                }))
              }
            />
          </div>
          <div className="my-1">
            <label className="label">
              <span className="label-text">Reps</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={formData.reps}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  reps: e.target.valueAsNumber,
                }))
              }
            />
          </div>

          <div className="flex justify-center">
            <button onClick={addExercise} className="btn btn-secondary mt-10">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewWorkoutForm;
