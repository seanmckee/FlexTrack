import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type User = {
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
  // const [username, setUsername] = useState("");
  // const [weight, setWeight] = useState(0);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="pt-[75px] p-5">
      <h1>View or Edit Information Here</h1>
      <div className="flex">
        <h1 className="text-xl mr-4 mt-2">Username: </h1>
        <input
          type="text"
          placeholder={"Type here"}
          className="input input-bordered w-full max-w-xs"
          value={user?.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="flex">
        <h1 className="text-xl mr-4 mt-2">Weight(lbs): </h1>
        <input
          type="number"
          placeholder={"Type here"}
          className="input input-bordered w-full max-w-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          value={String(user?.weight)}
          onChange={(e) => setUser({ ...user, weight: Number(e.target.value) })}
        />
      </div>

      <button className="btn btn-secondary">Update</button>
    </div>
  );
};

export default Profile;
