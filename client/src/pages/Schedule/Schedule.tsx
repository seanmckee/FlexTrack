import { useEffect, useState } from "react";
import { Workout } from "../../types/types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface IDay {
  isRestDay: boolean;
  workout: Workout | null;
}

const Schedule = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();

  const [schedule, setSchedule] = useState<IDay[]>([
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
    { isRestDay: true, workout: null },
  ]);

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const changeIsRestDay = (index: number) => {
    const newSchedule = [...schedule];
    if (!newSchedule[index].isRestDay) newSchedule[index].workout = null;
    newSchedule[index].isRestDay = !newSchedule[index].isRestDay;
    setSchedule(newSchedule);
    console.log(schedule);
  };

  function handleSelectChange(index: number, newWorkout: Workout) {
    const newSchedule = [...schedule];
    newSchedule[index].workout = newWorkout;
    setSchedule(newSchedule);
    console.log(schedule);
  }

  // fetch all user's workouts from db
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/workout/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );

      setWorkouts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // get schedule from db
  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/workout/schedule/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setSchedule(response.data);
      console.log(schedule);
    } catch (error) {
      console.error(error);
    }
  };

  // update schedule in db
  const saveSchedule = async () => {
    try {
      await axios.put(
        `http://localhost:3000/workout/schedule/${userID}`,
        { schedule },
        { headers: { authorization: cookies.access_token } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // get current day's workout to display

  // set current day's workout to display

  useEffect(() => {
    fetchWorkouts();
    fetchSchedule();
  }, []);

  return (
    <div className="pt-[100px] m-auto max-w-[800px]">
      <button className="btn btn-secondary flex mx-auto" onClick={saveSchedule}>
        Save
      </button>
      {daysOfWeek.map((day, index) => (
        <div
          className={
            index === currentDayIndex
              ? "p-6 border-2 border-secondary m-2 my-5 rounded-lg"
              : "p-6 border-2 m-2 my-5 rounded-lg"
          }
          key={index}
        >
          <div className="flex justify-between items-center">
            <p className="sm:text-2xl font-semibold">{day}</p>
            <div className="flex">
              <label className="cursor-pointer label mx-2">
                <span className="label-text mx-2">Rest</span>
                <input
                  type="checkbox"
                  checked={schedule[index]?.isRestDay}
                  onChange={() => changeIsRestDay(index)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
              </label>
              <div className="relative max-w-sm z-0">
                <select
                  disabled={schedule[index]?.isRestDay}
                  // value={schedule[index]?.workout?.name}
                  // onChange={() => }

                  value={schedule[index]?.workout?.name}
                  onChange={(e) =>
                    handleSelectChange(index, workouts[e.target.selectedIndex])
                  }
                  className="btn btn-neutral w-full h-full p-2.5 border rounded-md outline-none appearance-none text-center bg-inherit"
                >
                  {workouts.length === 0 ? (
                    <option className="bg-inherit p-5">
                      Please Create a Workout
                    </option>
                  ) : (
                    workouts.map((workout, workoutIndex) => (
                      <option
                        key={workoutIndex}
                        className="bg-inherit p-5"
                        value={
                          schedule[index]?.isRestDay ? "Rest Day" : workout.name
                        }
                        // onChange={() => onOptionChange(index, workoutIndex)}
                      >
                        {schedule[index]?.isRestDay ? "Rest Day" : workout.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              {schedule[index].isRestDay ? (
                <button
                  disabled={schedule[index].isRestDay}
                  className="btn btn-outline btn-secondary mx-2"
                >
                  View
                </button>
              ) : (
                <Link to={`/workout/${schedule[index].workout?._id}`}>
                  <button
                    disabled={schedule[index].isRestDay}
                    className="btn btn-outline btn-secondary mx-2"
                  >
                    View
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
