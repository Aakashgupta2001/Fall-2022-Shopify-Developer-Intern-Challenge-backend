//React & PAckages
import { Fragment, useEffect, useState } from "react";
import { InputGroup, Input, Button, Table } from "reactstrap";
import { useNavigate, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
//Components
import Navbar from "../../components/navbar/Navbar";
import { default as CustomButton } from "../../components/button/Button";
import ConfirmDelete from "../../components/confirmDelete/ConfirmDelete";

const Products = (props) => {
  const { getProductList, productList, token, deleteProduct } = props;
  const [searchText, setSearchText] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProductList(token, searchText);
  }, [searchText]);

  const handleAddProduct = () => {
    navigate("/addProducts");
  };

  const handleDelete = (productID) => {
    setIsConfirmDelete(true);
    setDeleteId(productID);
  };

  const handleCancel = () => {
    setIsConfirmDelete(false);
  };

  const confirmDelete = (deleteText) => {
    // setIsConfirmDelete(false);
    console.log("delete ", deleteText);
    console.log("delete ", deleteId);
    const params = {
      id: deleteId,
      deleteMessage: deleteText,
    };
    deleteProduct(params, token);
    setIsConfirmDelete(false);
    setTimeout(() => {
      getProductList(token, searchText);
    }, 300);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-24 w-4/5  ">
        <div className="mx-auto">
          <div className="flex">
            <div className="w-4/5 mx-auto">
              <InputGroup>
                <Input placeholder="search" value={searchText} onChange={(value) => setSearchText(value.target.value)} />
              </InputGroup>
            </div>
            <CustomButton onClick={handleAddProduct} buttonStyle="fill">
              Create
            </CustomButton>
          </div>

          <div className="mt-10">
            <Table bordered>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              {productList &&
                productList.map((item) => {
                  return (
                    <tbody key={item._id}>
                      <tr>
                        <th scope="row">{item.code}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td className="text-center">
                          <NavLink to={`/editProducts?id=${item._id}`}>
                            <span className="cursor-pointer">
                              <FontAwesomeIcon icon={faPenSquare} />
                            </span>
                          </NavLink>
                        </td>
                        <td className="text-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </div>
        </div>
      </div>
      {isConfirmDelete ? <ConfirmDelete onCancel={handleCancel} onSubmit={confirmDelete} /> : ""}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  productList: state.product.productList,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { ProductActions } = require("../../store/ProductRedux");
  return {
    ...stateProps,
    ...ownProps,
    getProductList: (token, searchText) => {
      ProductActions.getProductList(dispatch, token, searchText);
    },
    deleteProduct: (params, token) => {
      ProductActions.deleteProduct(dispatch, params, token);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Products);
