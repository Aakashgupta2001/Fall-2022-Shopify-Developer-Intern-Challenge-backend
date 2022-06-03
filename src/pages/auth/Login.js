import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const { isFetching, login, error, token } = props;
  const pageActive = useRef(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [states, setStates] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (token) {
      navigate("/materials");
    }
  }, [token]);

  const inputChange = (key, value) => {
    setStates({ ...states, [key]: value.target.value });
    setErrors({ ...errors, [key]: null });
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formsubmit = (e) => {
    e.preventDefault();

    if (!states.password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: "Add Your Password" });
      return;
    }
    pageActive.current = true;
    login({
      password: states.password,
      email: states.email,
    });
  };
  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen bg-cover bg-loginBack font-Poppins">
        <div className="container mx-auto w-fit px-5 py-10 shadow-lg rounded-md bg-white bg-opacity-80">
          <h1 className="font-bold text-2xl leading-loose text-center">Login</h1>

          <form className="leading-relaxed">
            <label htmlFor="email" className="block text-gray-700 text-md font-semibold mt-2 ">
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

            <div className="flex justify-between items-center">
              <label htmlFor="password" className=" text-gray-700 text-md font-semibold mt-2">
                Password
              </label>
            </div>
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
            {errors && <span className="text-xs font-semibold text-red-600">{errors.email ? errors.email : errors.password}</span>}
            {error && pageActive.current && <span className="text-xs font-semibold text-red-600">{error}</span>}

            <button onClick={formsubmit} className="bg-blue-100 hover:bg-blue-300 text-white py-2 px-3 rounded mt-5 w-full">
              login
            </button>
          </form>
          {/* <span className="block mt-5 text-xs text-center">
            Dont't have an account yet?{" "}
            <span className="text-blue-200 cursor-pointer">
              <NavLink to="/signup">Create an account</NavLink>
            </span>
          </span> */}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { AuthActions } = require("../../store/AuthRedux");
  return {
    ...stateProps,
    ...ownProps,
    login: (params) => {
      AuthActions.login(dispatch, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Login);
