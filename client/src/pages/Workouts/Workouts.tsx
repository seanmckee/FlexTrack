import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BsFillTrashFill } from "react-icons/bs";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface FormData {
  workoutName: string;
  exerciseName: string;
  sets: number;
  reps: number;
}

const Workouts = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    workoutName: "",
    exerciseName: "",
    sets: 0,
    reps: 0,
  });

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    console.log(workouts);
  }, []);

  const addExercise = () => {
    event?.preventDefault();
    const newExercise: Exercise = {
      name: formData.exerciseName,
      sets: formData.sets,
      reps: formData.reps,
    };
    setExercises((prev) => [...prev, newExercise]);
    formData.exerciseName = "";
    formData.sets = 0;
    formData.reps = 0;
  };

  const saveWorkout = async () => {
    event?.preventDefault();
    const newWorkout = {
      name: formData.workoutName,
      exercises: exercises,
    };
    setWorkouts((prev) => [...prev, newWorkout]);
    formData.workoutName = "";
    formData.exerciseName = "";
    formData.sets = 0;
    formData.reps = 0;
    setExercises([]);
  };

  const deleteExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const setFormVisible = () => {
    setShowForm((current) => !current);
  };

  return (
    <div className="pt-[75px] p-6">
      <button onClick={setFormVisible} className="btn btn-secondary">
        New Workout
      </button>
      <div className={showForm ? "" : "hidden"}>
        <h1 className="text-xl mt-5">Create New Workout</h1>
        <form>
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

          <div className="flex">
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
            <div>
              <button onClick={addExercise} className="btn btn-secondary mt-10">
                Add
              </button>
            </div>
          </div>
        </form>
        <div>
          {exercises.map((exercise, index) => {
            return (
              <div className="flex">
                <h1 className="p-2 border my-2 rounded-md w-[500px] flex justify-between">
                  <span className="">{exercise.name}</span>
                  <span>
                    {exercise.sets} sets x {exercise.reps} reps
                  </span>
                </h1>
                <button
                  onClick={() => deleteExercise(index)}
                  className="ml-2 mt-1 px-3 btn btn-secondary rounded-md"
                >
                  <BsFillTrashFill size={16} />
                </button>
              </div>
            );
          })}
          <button className="btn btn-secondary mt-10">Save Workout</button>
        </div>
      </div>
    </div>
  );
};

export default Workouts;