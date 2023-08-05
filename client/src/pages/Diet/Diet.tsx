import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { User } from "../../types/types";

import { useEffect, useState } from "react";

const initializeUser = {
  username: "",
  email: "",
  age: 0,
  currentCalories: 0,
  currentProtein: 0,
  goalCalories: 0,
  goalProtein: 0,
  goalWeight: 0,
  height: 0,
  weight: 0,
  workouts: [],
};

const Diet = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [user, setUser] = useState<User>(initializeUser);
  const [caloriePercentage, setCaloriePercentage] = useState(0);
  const [proteinPercentage, setProteinPercentage] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);

  const handleCalorieChange = (sign: string) => {
    const signedCalories = sign === "-" ? -calories : calories;
    try {
      axios.put(
        `http://localhost:3000/profile/calories/${userID}`,
        { calories: signedCalories },
        { headers: { authorization: cookies.access_token } }
      );
      console.log("calories changed: " + signedCalories);
    } catch (error) {
      console.error(error);
    }
  };

  // calories go up if positive number, down if negative

  const handleNumberedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof User
  ) => {
    const value = e.target.value;
    const newValue =
      value === "" ? "" : isNaN(Number(value)) ? user?.[id] : Number(value);
    setUser({ ...user, [id]: newValue });
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [handleCalorieChange]);

  useEffect(() => {
    setCaloriePercentage(
      (Number(user?.currentCalories) / Number(user?.goalCalories)) * 100
    );

    setProteinPercentage(
      (Number(user?.currentProtein) / Number(user?.goalProtein)) * 100
    );
  }, [user]);

  return (
    <div className="pt-[75px] p-6 flex flex-col">
      <div className="flex">
        <CircularProgressbar
          className="w-[300px] "
          value={caloriePercentage}
          text={`${Math.round(caloriePercentage)}%`}
        />
        <div className="flex flex-col">
          <h3 className="m-5 text-xl">
            Current Calories: {user?.currentCalories} / {user?.goalCalories}
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={calories === 0 ? "" : calories}
            onChange={(e) => handleNumberedChange(e, "currentCalories")}
          />
          <div className="flex">
            <button
              className="btn btn-secondary grow m-1"
              onClick={() => handleCalorieChange("+")}
            >
              + Cal
            </button>
            <button
              className="btn btn-secondary grow m-1"
              onClick={() => handleCalorieChange("-")}
            >
              - Cal
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <CircularProgressbar
          className="w-[300px] "
          value={proteinPercentage}
          text={`${Math.round(proteinPercentage)}%`}
        />
        <h3 className="m-5 text-xl">
          Current Protein: {user?.currentProtein} / {user?.goalProtein}
        </h3>
      </div>
    </div>
  );
};

export default Diet;
