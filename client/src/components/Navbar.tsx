import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 fixed ">
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
      <div className="flex-none">
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
    </div>
  );
};

export default Navbar;
