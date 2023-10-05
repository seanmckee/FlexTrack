import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Workout } from "../../types/types";
import axios from "axios";
import { useCookies } from "react-cookie";

const ViewWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [cookies] = useCookies(["access_token"]);

  // fetch workout by id
  const fetchWorkout = async () => {
    try {
      const res = await axios.get(
        `https://flextrack-20fr.onrender.com/workout/day/${id}`,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setWorkout(res.data);
      console.log(workout);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  return (
    <div className="pt-[100px] max-w-[800px]">
      <h1 className="text-3xl font-bold text-center mb-5">{workout?.name}</h1>
      <div className="flex flex-col">
        {workout
          ? workout.exercises.map((exercise) => {
              return (
                <div className="flex" key={exercise.id}>
                  <h1 className="p-2 border my-2 rounded-md w-[90%] flex justify-between m-auto">
                    <div>
                      <span className="">{exercise.name}</span>
                    </div>

                    <span>
                      {exercise.sets} sets x {exercise.reps} reps
                    </span>
                  </h1>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ViewWorkout;
