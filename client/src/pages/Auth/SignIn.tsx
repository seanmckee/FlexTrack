import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface SignInProps {
  toggleHasAccount: () => void;
}

const SignIn: React.FC<SignInProps> = ({ toggleHasAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await axios.post(
        "https://flextrack-20fr.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.userID === undefined) {
        alert("Invalid Credentials");
        setEmail("");
        setPassword("");
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body p-[60px]">
            <h1 className="text-center text-2xl font-semibold underline decoration-pink-500">
              Sign In
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-secondary" onClick={signIn}>
                Login
              </button>
            </div>
            <button
              className="label-text-alt link link-hover mx-auto"
              onClick={toggleHasAccount}
            >
              Don't have an account? Register Here.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
