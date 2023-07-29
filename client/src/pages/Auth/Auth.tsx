import { useState } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const toggleHasAccount = () => setHasAccount(!hasAccount);

  return (
    <div>
      {hasAccount ? (
        <SignIn toggleHasAccount={toggleHasAccount} />
      ) : (
        <Signup toggleHasAccount={toggleHasAccount} />
      )}
    </div>
  );
};

export default Auth;
