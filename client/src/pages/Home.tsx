import lifter from "../assets/lifter.png";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2">
        <div className="m-auto text-7xl lg:pl-[200px] text-center lg:text-left">
          <h1 className="font-bold  mt-0 text-pink-500 lg:text-9xl">Fitness</h1>
          <h1 className="font-bold  mt-5 text-yellow-500">Should Be</h1>
          <h1 className="font-bold mt-5 text-blue-500">Simple</h1>
          <button className="btn btn-outline btn-secondary">
            Get Started <BsFillArrowRightCircleFill size={18} />
          </button>
        </div>
        <div className="hidden lg:block">
          <img
            src={lifter}
            alt="lifter"
            className="m-auto mt-10 md:pr-[200px] min-w-[750px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
