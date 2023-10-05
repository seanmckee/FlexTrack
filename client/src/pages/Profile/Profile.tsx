import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Height, User } from "../../types/types";

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

const Profile = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [user, setUser] = useState<User>(initializeUser);
  const [height, setHeight] = useState<Height>({ feet: 0, inches: 0 });
  // const [username, setUsername] = useState("");
  // const [weight, setWeight] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/profile/${userID}`,
        {
          height: user.height,
          weight: user.weight,
          age: user.age,
          goalCalories: user.goalCalories,
          goalProtein: user.goalProtein,
          goalWeight: user.goalWeight,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // change any number based form input value change
  const handleNumberedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof User
  ) => {
    const value = e.target.value;
    const newValue =
      value === "" ? 0 : isNaN(Number(value)) ? user?.[id] : Number(value);
    setUser({ ...user, [id]: newValue });
  };

  const handleHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof Height
  ) => {
    const value = e.target.value;
    const newValue =
      value === "" ? 0 : isNaN(Number(value)) ? height?.[id] : Number(value);
    setHeight({ ...height, [id]: newValue });
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
  }, []);

  useEffect(() => {
    setHeight({
      ...height,
      feet: Math.floor(user?.height / 12),
      inches: user?.height % 12,
    });
  }, [user?.height]);

  // keeps track of total height in inches
  useEffect(() => {
    const heightInInches = height.feet * 12 + height.inches;
    setUser({ ...user, height: heightInInches });
  }, [height]);

  return (
    <div className="pt-[75px] p-6 flex flex-col max-w-[600px] mx-auto">
      <form onSubmit={onSubmit} className="form-control">
        <h1>View or Edit Information Here</h1>
        <div className="">
          <div className="flex flex-col">
            <label className="text-xl label">
              <span className="label-text">Username: </span>
            </label>
            <input
              type="text"
              placeholder={"Enter Username"}
              className="input input-bordered"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Weight: </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Weight (lbs)"}
            className="input input-bordered"
            value={user?.weight === 0 ? "0" : String(user?.weight)}
            onChange={(e) => handleNumberedChange(e, "weight")}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Age: </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Age"}
            className="input input-bordered"
            value={user?.age === 0 ? "" : String(user?.age)}
            onChange={(e) => handleNumberedChange(e, "age")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Calorie Goal: </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Calorie Goal"}
            className="input input-bordered"
            value={user?.goalCalories === 0 ? "" : String(user?.goalCalories)}
            onChange={(e) => handleNumberedChange(e, "goalCalories")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Protein Goal: </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Protein Goal"}
            className="input input-bordered"
            value={user?.goalProtein === 0 ? "" : String(user?.goalProtein)}
            onChange={(e) => handleNumberedChange(e, "goalProtein")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Weight Goal: </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Weight Goal (lbs)"}
            className="input input-bordered"
            value={user?.goalWeight === 0 ? "" : String(user?.goalWeight)}
            onChange={(e) => handleNumberedChange(e, "goalWeight")}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl label">
            <span className="label-text">Height ([ft]/[in]): </span>
          </label>
          <div className="flex justify-around gap-4">
            <input
              type="text"
              inputMode="numeric"
              placeholder={"Enter Height (ft)"}
              className="input input-bordered w-full"
              value={height.feet === 0 ? "" : String(height.feet)}
              onChange={(e) => handleHeightChange(e, "feet")}
            />

            <input
              type="text"
              inputMode="numeric"
              placeholder={"Enter Height (in)"}
              className="input input-bordered w-full"
              value={height.inches === 0 ? "" : String(height.inches)}
              onChange={(e) => handleHeightChange(e, "inches")}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-secondary my-5">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
