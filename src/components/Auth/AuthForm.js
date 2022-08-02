import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = [];
    }
    let found = false;
    let fname = "";
    for (let user of users) {
      if (
        user["email"] === enteredEmail &&
        user["password"] === enteredPassword
      ) {
        found = true;
        fname = user["fname"];
        break;
      }
    }

    if (found) {
      authCtx.login(fname);
      history.replace("/profile");
    } else {
      alert("Authentication failed!");
    }
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFname = fNameInputRef.current.value;
    const enteredLname = lNameInputRef.current.value;

    const newUser = {
      email: enteredEmail,
      password: enteredPassword,
      fname: enteredFname,
      lname: enteredLname,
    };

    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = [];
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    authCtx.login(enteredFname);
    alert("New user registered!");
    history.replace("/profile");
  };

  if (isLogin) {
    return (
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Login</button>

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              Create new account
            </button>
          </div>
        </form>
      </section>
    );
  } else {
    return (
      <section className={classes.auth}>
        <h1>Sign Up</h1>
        <form onSubmit={registerHandler}>
          <div className={classes.control}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" required ref={fNameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" required ref={lNameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Create Account</button>

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              Login with existing account
            </button>
          </div>
        </form>
      </section>
    );
  }
};

export default AuthForm;
