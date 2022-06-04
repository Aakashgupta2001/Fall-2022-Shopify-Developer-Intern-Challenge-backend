//React & PAckages
import { Fragment, useEffect, useState } from "react";
import { InputGroup, Input, Button, Table } from "reactstrap";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
//Components
import Navbar from "../../components/navbar/Navbar";

const DeletedProducts = (props) => {
  const { getDeleteProductList, deleteProductList, token, restoreProducts } = props;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getDeleteProductList(token, searchText);
  }, [searchText]);

  const handleRestore = (id) => {
    restoreProducts(id, token);
    setTimeout(() => {
      getDeleteProductList(token, searchText);
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
          </div>

          <div className="mt-10">
            <Table bordered>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Product Name</th>
                  <th>Description</th>

                  <th className="text-center">Restore</th>
                </tr>
              </thead>
              {deleteProductList &&
                deleteProductList.map((item) => {
                  return (
                    <tbody key={item._id}>
                      <tr>
                        <th scope="row">{item.code}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="text-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              handleRestore(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faReply} />
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  deleteProductList: state.product.productList,
});

const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { ProductActions } = require("../../store/ProductRedux");
  return {
    ...stateProps,
    ...ownProps,
    getDeleteProductList: (token, searchText) => {
      ProductActions.getDeleteProductList(dispatch, token, searchText);
    },
    restoreProducts: (params, token) => {
      ProductActions.restoreProducts(dispatch, params, token);
    },
  };
};
export default connect(mapStateToProps, undefined, mapDispatchToProps)(DeletedProducts);
