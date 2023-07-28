import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 absolute">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl text-default-500"
        >
          FlexTrack
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
