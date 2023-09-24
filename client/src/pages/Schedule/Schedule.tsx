import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Workout } from "../../types/types";
import axios from "axios";
import { useCookies } from "react-cookie";

const Schedule = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

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
  const today = daysOfWeek[currentDayIndex];

  const [workouts, setWorkouts] = useState<Workout[]>([]);

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

  // get current day's workout to display

  // set current day's workout to display

  useEffect(() => {
    setDay(today);

    fetchWorkouts();
  }, []);

  return (
    <div className="pt-[100px] m-auto w-[800px]">
      {daysOfWeek.map((day, index) => (
        <div
          className={
            index === currentDayIndex
              ? "p-6 border-2 border-secondary m-2 my-5 rounded-lg"
              : "p-6 border-2 m-2 my-5 rounded-lg"
          }
          key={index}
        >
          <div className="flex justify-between">
            <p>{day}</p>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                Actions
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                aria-labelledby="hs-dropdown-default"
              >
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Newsletter
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Purchases
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Downloads
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Team Account
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
