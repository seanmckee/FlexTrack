import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface User {
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
  workouts: [];
}

const Profile = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState(0);

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

  useEffect(() => {
    // Update the username state whenever the user state changes
    if (user) {
      setUsername(user.username);
      setWeight(user.weight);
    }
  }, [user]);

  return (
    <div className="pt-[75px] p-5">
      <div className="flex">
        <h1 className="text-xl mr-4 mt-2">Username: </h1>
        <input
          type="text"
          placeholder={"Type here"}
          className="input input-bordered w-full max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex">
        <h1 className="text-xl mr-4 mt-2">Weight(lbs): </h1>
        <input
          type="number"
          placeholder={"Type here"}
          className="input input-bordered w-full max-w-xs"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Profile;
