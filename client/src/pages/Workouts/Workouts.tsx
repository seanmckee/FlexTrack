import { useState } from "react";

const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState([]);

  const setFormVisible = () => {
    setShowForm((current) => !current);
  };

  return (
    <div className="pt-[75px] p-6">
      <button onClick={setFormVisible} className="btn btn-secondary">
        New Workout
      </button>
      <div className={showForm ? "" : "hidden"}>
        <h1 className="text-xl mt-5">Create New Workout</h1>
        <form>
          <label className="label">
            <span className="label-text">Workout Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />

          <div className="flex">
            <div className="my-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="my-1">
              <label className="label">
                <span className="label-text">Sets</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="my-1">
              <label className="label">
                <span className="label-text">Reps</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <button className="btn btn-secondary mt-10">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Workouts;
