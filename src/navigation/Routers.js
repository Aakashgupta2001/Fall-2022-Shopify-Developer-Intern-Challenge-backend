import { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, Signup, Products, AddProducts, EditProducts, DeletedProducts } from "../pages";

const Routers = (props) => {
  const { user } = props;
  return (
    <BrowserRouter>
      {user !== null ? (
        <Fragment>
          <Routes>
            <Route path="/dashboard" element={<Products />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/addProducts" element={<AddProducts />}></Route>
            <Route path="/editProducts/*" element={<EditProducts />}></Route>
            <Route path="/deletedProducts" element={<DeletedProducts />}></Route>
            <Route path="*" element={<Products />}></Route>
          </Routes>
        </Fragment>
      ) : (
        <Fragment>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="*" element={<Login />}></Route>
          </Routes>
        </Fragment>
      )}
    </BrowserRouter>
  );
};

const mapStatetoProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStatetoProps)(Routers);
