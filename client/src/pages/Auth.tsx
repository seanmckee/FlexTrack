const Auth = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In</h1>
            <p className="py-6">
              Unlock the full potential of FlexTrack by signing in! With
              personalized profiles, calorie tracking, workout planning, and
              seamless progress monitoring, you'll have all the tools at your
              fingertips to achieve your fitness goals. Join us now and start
              your fitness journey with confidence!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <button className="label-text-alt link link-hover mx-auto">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
