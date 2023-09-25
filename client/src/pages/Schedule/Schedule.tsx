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
            <p>test</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
