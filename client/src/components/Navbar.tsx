import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };
  const logoutMobile = () => {
    setCookies("access_token", "");
    setNav(false);
    window.localStorage.removeItem("userID");
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl text-default-500 text-pink-500"
        >
          <div className="flex underline decoration-blue-500 underline-offset-4">
            <span>Flex</span>
            <span className="text-yellow-500">Track</span>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className={"md:block hidden flex-none"}>
        <ul className="menu menu-horizontal px-1">
          {window.localStorage.getItem("userID") ? (
            <div className="flex">
              <li>
                <Link to="/schedule">Schedule</Link>
              </li>
              <li>
                <Link to="/workouts">Workouts</Link>
              </li>
              <li>
                <Link to="/diet">Diet</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={logout}>
                <Link to="">Sign Out</Link>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
          )}
        </ul>
      </div>

      {/* hamburger menu */}
      <div onClick={handleClick} className="flex-none md:hidden flex z-10">
        {nav ? <FaTimes size={25} /> : <RxHamburgerMenu size={20} />}
      </div>

      {/* mobile menu */}
      {window.localStorage.getItem("userID") ? (
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-inherit flex flex-col justify-center items-center"
          }
        >
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="/schedule">
              Schedule
            </Link>
          </li>

          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="/workouts">
              Workouts
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="/diet">
              Diet
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="/profile">
              Profile
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link onClick={logoutMobile} to="">
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-inherit flex flex-col justify-center items-center"
          }
        >
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="/auth">
              Sign In
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
