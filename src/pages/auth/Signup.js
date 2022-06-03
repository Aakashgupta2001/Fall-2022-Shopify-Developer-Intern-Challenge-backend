import { Fragment, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";

const Signup = (props) => {
  const { isFetching, signUp, isSignup, error, setSignedIn } = props;
  const pageActive = useRef(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignup && pageActive.current) {
      pageActive.current = false;
      setSignedIn();
      setStates({ name: "", email: "", password: "" });
      navigate("/login");
    }
  }, [isSignup]);

  const [states, setStates] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const inputChange = (key, value) => {
    setStates({ ...states, [key]: value.target.value });
    setErrors({ ...errors, [key]: null });
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formsubmit = (e) => {
    e.preventDefault();
    if (!states.name) {
      nameRef.current.focus();
      setErrors({ ...errors, name: "Add Your Name" });
      return;
    }

    if (!states.password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: "Add Your Password" });
      return;
    }
    pageActive.current = true;
    signUp({
      name: states.name,
      password: states.password,
      email: states.email,
    });
  };

  return (
    <Fragment>
      {isSignup && pageActive.current && (
        <Toast>
          <ToastHeader>
            <strong className="me-auto">Success</strong>
            <small>1 mins ago</small>
          </ToastHeader>
          <ToastBody>You have succesfully signed in.</ToastBody>
        </Toast>
      )}

      <div className="flex items-center justify-center h-screen bg-cover bg-loginBack font-Poppins">
        <div className="container mx-auto w-fit px-5 py-10 shadow-lg rounded-md bg-white bg-opacity-80">
          <h1 className="font-bold text-2xl leading-loose text-center">Create Account</h1>

          <form className="leading-relaxed">
            <label htmlFor="name" className="block text-gray-700 text-md font-semibold mt-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="block text-sm shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 mt-1 w-80"
              ref={nameRef}
              value={states.fullname}
              onChange={(val) => inputChange("name", val)}
            ></input>

            <label htmlFor="email" className="block text-gray-700 text-md font-semibold mt-2">
              E-Mail
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="block text-sm shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 mt-1 w-80"
              ref={emailRef}
              value={states.email}
              onChange={(val) => inputChange("email", val)}
            ></input>

            <label htmlFor="password" className="block text-gray-700 text-md font-semibold mt-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="inline-block text-sm shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 mt-1 w-80 relative"
                ref={passwordRef}
                value={states.password}
                onChange={(val) => inputChange("password", val)}
              ></input>
              <span className="absolute inset-y-0 right-2 pr-3 flex items-center text-gray-700 select-none" onClick={togglePassword}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}></FontAwesomeIcon>
              </span>
            </div>
            {errors && (
              <span className="text-xs font-semibold text-red-600">
                {errors.email ? errors.email : errors.password ? errors.password : errors.name}
                {error && pageActive.current && <span className="text-xs font-semibold text-red-600">{error}</span>}
              </span>
            )}

            <button onClick={formsubmit} className="bg-blue-100 hover:bg-blue-300 text-white py-2 px-3 rounded mt-5 w-full">
              Signup
            </button>
          </form>
          <span className="block mt-5 text-xs text-center">
            Already have an account ?{" "}
            <span className="text-blue-200 cursor-pointer">
              <NavLink to="/login"> LogIn</NavLink>
            </span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  isSignup: state.auth.isSignup,
  error: state.auth.error,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    signUp: (params) => {
      AuthActions.signUp(dispatch, params);
    },
    setSignedIn: () => {
      AuthActions.setSignedIn(dispatch);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Signup);
