//React & Packages
import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";

const EditProducts = (props) => {
  const { createProduct, token, isFetching, error, getProductById, product, updateProduct } = props;

  const [pageActive, setPageActive] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getProductById(id, token);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(product);
    if (product) {
      setStates({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
      });
    }
  }, [product]);

  const [states, setStates] = useState({
    name: product?.name ? product.name : "",
    description: product?.description ? product.description : "",
    price: product?.price ? product.price : "",
    quantity: product?.quantity ? product.quantity : "",
  });

  const [errors, setErrors] = useState({
    name: null,
    description: null,
    price: null,
    quantity: null,
  });

  useEffect(() => {
    if (!isFetching && error !== true && pageActive) {
      navigate("/products");
    }
  }, [pageActive, isFetching, error]);

  const inputChange = (key, value) => {
    setStates({ ...states, [key]: value.target.value });
    setErrors({ ...errors, [key]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!states.name) {
      setErrors({ ...errors, name: "Add Name" });
      return;
    }
    if (!states.description) {
      setErrors({ ...errors, description: "Add Description" });
      return;
    }
    if (!states.price) {
      setErrors({ ...errors, price: "Add Default Price" });
      return;
    }
    setPageActive(true);
    console.log("states", states);
    updateProduct(states, token);
  };

  return (
    <Fragment>
      <Navbar />

      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className=" text-lg font-bold pb-4">Edit Products</h1>
        <form>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" name="productName" className="block text-sm border rounded-lg py-2 px-3 text-gray-700  w-80" value={states.name} onChange={(val) => inputChange("name", val)} />
          <label htmlFor="productDescription" className="mt-2">
            Description:
          </label>
          <input type="text" name="productDescription" className="block text-sm border rounded-lg py-2 px-3 text-gray-700  w-80" value={states.description} onChange={(val) => inputChange("description", val)} />
          <label htmlFor="price" className="mt-2">
            Price:
          </label>
          <input type="text" name="price" className="block text-sm border rounded-lg py-2 px-3 text-gray-700  w-80" value={states.price} onChange={(val) => inputChange("price", val)} />
          <label htmlFor="quantity" className="mt-2">
            quantity:
          </label>
          <input type="text" name="quantity" className="block text-sm border rounded-lg py-2 px-3 text-gray-700  w-80" value={states.quantity} onChange={(val) => inputChange("quantity", val)} />
          {errors && <span className="text-xs font-semibold text-red-600">{errors.name ? errors.name : errors.description}</span>}
          <div className="flex justify-center mt-4">
            <Button onClick={handleSubmit} buttonStyle="fill" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  product: state.product.product,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { ProductActions } = require("../../store/ProductRedux");
  return {
    ...stateProps,
    ...ownProps,
    createProduct: (params, token) => {
      ProductActions.createProduct(dispatch, params, token);
    },
    getProductById: (params, token) => {
      ProductActions.getProductById(dispatch, params, token);
    },
    updateProduct: (params, token) => {
      ProductActions.updateProduct(dispatch, params, token);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(EditProducts);
