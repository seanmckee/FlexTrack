import axios from "axios";
import { useState } from "react";

interface SignUpProps {
  toggleHasAccount: () => void;
}

const Signup: React.FC<SignUpProps> = ({ toggleHasAccount }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      return;
    } else {
      try {
        await axios.post("http://localhost:3000/auth/register", {
          email,
          username,
          password,
        });
        toggleHasAccount();
        alert("Account Created, Please Sign In");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body p-[60px]">
            <h1 className="text-center text-2xl font-semibold underline decoration-pink-500">
              Sign Up
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
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-secondary" onClick={signUp}>
                Sign Up
              </button>
            </div>
            <button
              className="label-text-alt link link-hover mx-auto"
              onClick={toggleHasAccount}
            >
              Already have an account? Sign in here.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
