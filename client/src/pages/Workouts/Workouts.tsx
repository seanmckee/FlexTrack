import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BsFillTrashFill } from "react-icons/bs";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import NewWorkoutForm from "./NewWorkoutForm";
import { Exercise, ExerciseFormData, Workout } from "../../types/types";

const SortableExercise = ({ exercise }: { exercise: Exercise }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercise.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <h1
      ref={setNodeRef}
      key={exercise.id}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 border my-2 rounded-md flex justify-between"
    >
      <span className="">{exercise.name}</span>
      <span>
        {exercise.sets} sets x {exercise.reps} reps
      </span>
    </h1>
  );
};

const Workouts = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]); // [
  const [formData, setFormData] = useState<ExerciseFormData>({
    workoutName: "",
    exerciseName: "",
    sets: 0,
    reps: 0,
  });

  const addExercise = () => {
    event?.preventDefault();
    const newExercise: Exercise = {
      id: uuidv4(),
      name: formData.exerciseName,
      sets: formData.sets,
      reps: formData.reps,
    };
    setExercises((prev) => [...prev, newExercise]);
    formData.exerciseName = "";
    formData.sets = 0;
    formData.reps = 0;
  };

  const [triggerEffect, setTriggerEffect] = useState(false);

  const saveWorkout = async () => {
    event?.preventDefault();
    setTriggerEffect((current) => !current);
    const newWorkout = {
      name: formData.workoutName,
      exercises: exercises,
    };

    console.log(newWorkout);

    try {
      const response = await axios.post(
        `https://flextrack-20fr.onrender.com/workout/${userID}`,
        newWorkout,
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    formData.workoutName = "";
    formData.exerciseName = "";
    formData.sets = 0;
    formData.reps = 0;
    setExercises([]);
  };

  const deleteExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const deleteWorkout = async (index: number, id: string) => {
    console.log(workouts);
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);

    try {
      await axios.delete(`https://flextrack-20fr.onrender.com/workout/${id}`, {
        headers: { authorization: cookies.access_token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setExercises((exercises) => {
      const oldIndex = exercises.findIndex(
        (exercise) => exercise.id === active.id
      );
      const newIndex = exercises.findIndex(
        (exercise) => exercise.id === over.id
      );
      return arrayMove(exercises, oldIndex, newIndex);
    });
  };

  const setFormVisible = () => {
    setShowForm((current) => !current);
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `https://flextrack-20fr.onrender.com/workout/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setWorkouts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [triggerEffect, saveWorkout]);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  return (
    <div className="pt-[100px] p-6 flex flex-col items-center max-w-[600px] mx-auto">
      <button onClick={setFormVisible} className="btn btn-secondary ">
        {showForm ? "Close Form" : "New Workout"}
      </button>
      <div className={showForm ? "" : "hidden"}>
        <h1 className="text-xl mt-5 text-center">Create New Workout</h1>
        {/* form used to go here */}
        <NewWorkoutForm
          formData={formData}
          setFormData={setFormData}
          addExercise={addExercise}
        />
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={exercises}
              strategy={verticalListSortingStrategy}
            >
              {exercises.map((exercise, index) => {
                return (
                  <div className="flex" key={exercise.id}>
                    <SortableExercise exercise={exercise} />
                    <button
                      onClick={() => deleteExercise(index)}
                      className="ml-2 mt-1 px-3 btn btn-secondary rounded-md"
                    >
                      <BsFillTrashFill size={16} />
                    </button>
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
          <button
            onClick={saveWorkout}
            className="btn btn-secondary mt-10 flex mx-auto"
          >
            Save Workout
          </button>
        </div>
      </div>
      {workouts.map((workout, index) => {
        return (
          <div className=" my-5 rounded-md p-5 w-[99%]" key={workout._id}>
            <div className="flex items-center m-auto justify-between">
              <h1 className="text-xl">{workout.name.toUpperCase()}</h1>
              <button
                onClick={() => deleteWorkout(index, workout._id)}
                className="ml-2 mt-1 px-3 bg-pink-500 p-3 rounded-md"
              >
                <BsFillTrashFill size={16} />
              </button>
            </div>

            {workout.exercises.map((exercise) => {
              return (
                <div className="flex flex-col w-full" key={exercise.id}>
                  <h1 className="p-4 border my-2 rounded-md flex justify-between">
                    <div>
                      <span className="">
                        {exercise.name.length >= 18
                          ? exercise.name.substring(0, 18) + "..."
                          : exercise.name}
                      </span>
                    </div>

                    <span>
                      {exercise.sets} sets x {exercise.reps} reps
                    </span>
                  </h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Workouts;
