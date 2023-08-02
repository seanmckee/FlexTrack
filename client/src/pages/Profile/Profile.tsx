import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export type User = {
  username: string;
  email: string;
  age: number;
  currentCalories: number;
  currentProtein: number;
  goalCalories: number;
  goalProtein: number;
  goalWeight: number;
  height: number;
  weight: number;
  workouts: any[];
};

type Height = {
  feet: number;
  inches: number;
};

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
    <div className="pt-[75px] p-6">
      <form onSubmit={onSubmit} className="form-control">
        <h1>View or Edit Information Here</h1>
        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Username: </h1>
          <input
            type="text"
            placeholder={"Enter Username"}
            className="input input-bordered w-full max-w-xs"
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            readOnly
          />
        </div>
        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Weight: </h1>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Weight (lbs)"}
            className="input input-bordered w-full max-w-xs"
            value={user?.weight === 0 ? "" : String(user?.weight)}
            onChange={(e) => handleNumberedChange(e, "weight")}
          />
        </div>
        <div className="sm:flex p-5">
          <h1 className="text-xl mr-[50px] mt-2">Age: </h1>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Age"}
            className="input input-bordered w-full max-w-xs"
            value={user?.age === 0 ? "" : String(user?.age)}
            onChange={(e) => handleNumberedChange(e, "age")}
          />
        </div>

        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Calorie Goal: </h1>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Calorie Goal"}
            className="input input-bordered w-full max-w-xs"
            value={user?.goalCalories === 0 ? "" : String(user?.goalCalories)}
            onChange={(e) => handleNumberedChange(e, "goalCalories")}
          />
        </div>

        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Protein Goal: </h1>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Protein Goal (g)"}
            className="input input-bordered w-full max-w-xs"
            value={user?.goalProtein === 0 ? "" : String(user?.goalProtein)}
            onChange={(e) => handleNumberedChange(e, "goalProtein")}
          />
        </div>

        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Weight Goal: </h1>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Weight Goal (lbs)"}
            className="input input-bordered w-full max-w-xs"
            value={user?.goalWeight === 0 ? "" : String(user?.goalWeight)}
            onChange={(e) => handleNumberedChange(e, "goalWeight")}
          />
        </div>
        <div className="sm:flex p-5">
          <h1 className="text-xl mr-4 mt-2">Height ([ft]/[in]): </h1>

          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Height (ft)"}
            className="input input-bordered w-[80px] max-w-xs mr-5"
            value={height.feet === 0 ? "" : String(height.feet)}
            onChange={(e) => handleHeightChange(e, "feet")}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder={"Enter Height (in)"}
            className="input input-bordered w-[80px] max-w-xs"
            value={height.inches === 0 ? "" : String(height.inches)}
            onChange={(e) => handleHeightChange(e, "inches")}
          />
        </div>

        <button type="submit" className="btn btn-secondary m-5">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
