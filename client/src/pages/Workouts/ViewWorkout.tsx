import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Workout } from "../../types/types";
import axios from "axios";
import { useCookies } from "react-cookie";

const ViewWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [cookies] = useCookies(["access_token"]);

  // fetch workout by id
  const fetchWorkout = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/workout/day/${id}`, {
        headers: { authorization: cookies.access_token },
      });
      setWorkout(res.data);
      console.log(workout);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  return <div className="pt-[100px] m-auto w-[800px]">{String(workout)}</div>;
};

export default ViewWorkout;
