import { useEffect, useState } from "react";
import { Workout } from "../../types/types";
import axios from "axios";
import { useCookies } from "react-cookie";

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

  const [isRestDay, setIsRestDay] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [schedule, setSchedule] = useState<string[]>([]);

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const changeIsRestDay = (index: number) => {
    const newIsRestDay = [...isRestDay];
    newIsRestDay[index] = !newIsRestDay[index];
    setIsRestDay(newIsRestDay);
    console.log(isRestDay);
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  const saveSchedule = async () => {
    console.log("schedule saved");
  };

  // get current day's workout to display

  // set current day's workout to display

  useEffect(() => {
    fetchWorkouts();
    fetchSchedule();
  }, []);

  return (
    <div className="pt-[100px] m-auto w-[800px]">
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
            <p className="text-2xl">{day}</p>
            <div className="flex">
              <label className="cursor-pointer label mx-2">
                <span className="label-text mx-2">Rest Day</span>
                <input
                  type="checkbox"
                  checked={isRestDay[index]}
                  onChange={() => changeIsRestDay(index)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
              </label>
              <div className="relative max-w-sm z-0">
                <select
                  disabled={isRestDay[index]}
                  className="btn btn-neutral w-full h-full p-2.5 border rounded-md outline-none appearance-none text-center bg-inherit"
                >
                  {workouts.length === 0 ? (
                    <option className="bg-inherit p-5">
                      Please Create a Workout
                    </option>
                  ) : (
                    workouts.map((workout, workoutIndex) => (
                      <option key={workoutIndex} className="bg-inherit p-5">
                        {isRestDay[index] ? "Rest Day" : workout.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <button className="btn btn-outline btn-secondary mx-2 rounded-smd">
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
