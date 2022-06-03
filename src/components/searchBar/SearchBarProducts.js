import { useEffect, useState, useRef } from "react";
import Downshift from "downshift";
import { connect } from "react-redux";

const SearchBarProducts = (props) => {
  const {
    productList,
    getProductList,
    token,
    searchText,
    setSelectedValue,
    setSearchText,
    selectedValue,
  } = props;

  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    getProductList(token, searchText);
    console.log(productList, "maethroesahnfio");
  }, [searchText]);

  const handleSearchInput = (event) => {
    setSelectedValue();
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  return (
    <Downshift
      onChange={(selection) => {
        setSelectedValue(selection.name);
        props.takeProductValue(selection);
        setInputFocus(false);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div className="">
          <div className="">
            <input
              placeholder="Search for your Product"
              onFocus={() => {
                setInputFocus(true);
              }}
              onBlur={() => {
                setInputFocus(false);
                if (!selectedValue) {
                  setSelectedValue(productList[0].name);
                  props.takeProductValue(productList[0]);
                }
              }}
              className="block text-sm   border rounded-lg py-2 px-3 text-gray-700  w-80"
              value={selectedValue || searchText}
              onChange={handleSearchInput}
            />
            {inputFocus && productList.length !== 0 && (
              <ul className="rounded bg-gray-100 h-fit max-h-40 border-2 border-black fixed w-80 overflow-auto">
                {inputFocus
                  ? productList.map(
                      (item, index) => (
                        console.log(inputFocus, "inputFocus"),
                        (
                          <li
                            {...getItemProps({
                              key: item._id,
                              index,
                              item: item,
                              className: `py-2 px-2 ${
                                highlightedIndex === index
                                  ? "bg-gray font-bold"
                                  : "bg-white-100"
                              }`,
                            })}
                          >
                            {item.name}
                          </li>
                        )
                      )
                    )
                  : null}
              </ul>
            )}
          </div>
        </div>
      )}
    </Downshift>
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
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mapDispatchToProps
)(SearchBarProducts);
