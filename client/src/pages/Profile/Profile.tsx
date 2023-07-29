import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaUser } from "react-icons/fa";

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

  const [username, setUsername] = useState(user?.username);

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
      <div className="flex">
        <h1 className="text-xl mr-4 mt-2">Username: </h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Profile;
