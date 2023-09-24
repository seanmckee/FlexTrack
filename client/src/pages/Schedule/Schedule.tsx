import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Workout } from "../../types/types";

const Schedule = () => {
  // sets which day of the week's workouts to display
  const [day, setDay] = useState<string>("Monday");

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
  const currentDayName = daysOfWeek[currentDayIndex];

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // fetch all user's workouts from db

  // get current day's workout to display

  // set current day's workout to display

  useEffect(() => {
    setDay(currentDayName);
  }, []);

  return (
    <div className="pt-[75px] p-6">
      <details className="dropdown mb-32">
        <summary className="m-1 btn">
          {day} <FiChevronDown />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          {daysOfWeek.map((day) => {
            return (
              <li key={day}>
                <button
                  onClick={() => setDay(day)}
                  className="btn btn-ghost w-full"
                >
                  {day}
                </button>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
};

export default Schedule;
