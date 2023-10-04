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

  const handleReset = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/profile/reset/${userID}`,
        {},
        {
          headers: { authorization: cookies.access_token },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCalorieChange = (sign: string) => {
    const signedCalories = sign === "-" ? -calories : calories;
    try {
      axios.put(
        `http://localhost:3000/profile/calories/${userID}`,
        { calories: signedCalories },
        { headers: { authorization: cookies.access_token } }
      );
      // setCalories(calories + signedCalories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProteinChange = (sign: string) => {
    const signedProtein = sign === "-" ? -protein : protein;
    try {
      axios.put(
        `http://localhost:3000/profile/protein/${userID}`,
        { protein: signedProtein },
        { headers: { authorization: cookies.access_token } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleNumberedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof User
  ) => {
    const value = e.target.value;
    const newValue =
      value === "" ? "" : isNaN(Number(value)) ? user?.[id] : Number(value);
    setUser({ ...user, [id]: newValue });
    if (id === "currentProtein") {
      setProtein(isNaN(Number(value)) ? 0 : Number(value));
    } else if (id === "currentCalories") {
      setCalories(isNaN(Number(value)) ? 0 : Number(value));
    } else {
      console.error("handleNumberedChange: Invalid ID");
    }
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
  }, [handleCalorieChange, handleProteinChange]);

  useEffect(() => {
    setCaloriePercentage(
      (Number(user?.currentCalories) / Number(user?.goalCalories)) * 100
    );

    setProteinPercentage(
      (Number(user?.currentProtein) / Number(user?.goalProtein)) * 100
    );
  }, [user]);

  return (
    <div className="pt-[75px] p-6 flex flex-col items-center">
      {Number.isNaN(proteinPercentage) || Number.isNaN(caloriePercentage) ? (
        <h1 className="mb-5">Please fill out your profile information</h1>
      ) : (
        ""
      )}
      <div className="md:flex">
        <CircularProgressbar
          className="w-[300px] mr-10 mb-2"
          value={caloriePercentage}
          text={
            Number.isNaN(caloriePercentage)
              ? "0"
              : `${Math.round(caloriePercentage)}%`
          }
        />
        <div className="flex flex-col">
          <h3 className="m-5 text-xl text-center">
            Current Calories: {user?.currentCalories} / {user?.goalCalories}
          </h3>
          <div className="flex flex-col max-w-xs mb-10">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mb-1"
              value={calories === 0 ? "" : calories}
              onChange={(e) => handleNumberedChange(e, "currentCalories")}
            />
            <div className="flex">
              <button
                className="btn btn-secondary m-1 grow"
                onClick={() => handleCalorieChange("+")}
              >
                + Cal
              </button>
              <button
                className="btn btn-secondary m-1 grow"
                onClick={() => handleCalorieChange("-")}
              >
                - Cal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex">
        <CircularProgressbar
          className="w-[300px] mr-10 mb-2"
          value={proteinPercentage}
          text={
            Number.isNaN(proteinPercentage)
              ? "0"
              : `${Math.round(proteinPercentage)}%`
          }
        />
        <div>
          <h3 className="m-5 text-xl text-center">
            Current Protein: {user?.currentProtein} / {user?.goalProtein}
          </h3>
          <div className="flex flex-col max-w-xs mb-10">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mb-1"
              value={protein === 0 ? "" : protein}
              onChange={(e) => handleNumberedChange(e, "currentProtein")}
            />
            <div className="flex">
              <button
                className="btn btn-secondary grow m-1"
                onClick={() => handleProteinChange("+")}
              >
                + Protein
              </button>
              <button
                className="btn btn-secondary grow m-1"
                onClick={() => handleProteinChange("-")}
              >
                - Protein
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-secondary mt-10 w-[50%] m-auto"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Diet;
