import { React, Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { logout } = props;
  const navigate = useNavigate();

  return (
    <nav className="top-0 left-0 fixed w-full bg-white z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <div className="">
              <span className="text-xl px-3 py-2 rounded-md  font-medium">Logo</span>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <span
                onClick={() => {
                  navigate("/products");
                }}
                className="cursor-pointer text-lg border-2 hover:bg-gray-100  px-3 py-2 rounded-md font-medium"
              >
                Products
              </span>
              <span
                onClick={() => {
                  navigate("/deletedProducts");
                }}
                className="cursor-pointer text-lg border-2 hover:bg-gray-100  px-3 py-2 rounded-md font-medium"
              >
                Deleted Products
              </span>
              <span onClick={() => logout()} className="text-lg hover:bg-gray-100 hover:text-blue-100 text-blue-100 px-3 py-2 rounded-md font-medium">
                <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
    logout: () => dispatch(AuthActions.logout()),
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Navbar);
