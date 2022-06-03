import SiteAPI from "../services/SiteApis";

const types = {
  FETCH_PRODUCT_LIST_PENDING: "FETCH_PRODUCT_LIST_PENDING",
  FETCH_PRODUCT_LIST_FAILURE: "FETCH_PRODUCT_LIST_FAILURE",
  FETCH_PRODUCT_LIST_SUCCESS: "FETCH_PRODUCT_LIST_SUCCESS",

  FETCH_CREATE_PRODUCT_PENDING: "FETCH_CREATE_PRODUCT_PENDING",
  FETCH_CREATE_PRODUCT_FAILURE: "FETCH_CREATE_PRODUCT_FAILURE",
  FETCH_CREATE_PRODUCT_SUCCESS: "FETCH_CREATE_PRODUCT_SUCCESS",

  FETCH_PRODUCT_BY_ID_PENDING: "FETCH_PRODUCT_BY_ID_PENDING",
  FETCH_PRODUCT_BY_ID_FAILURE: "FETCH_PRODUCT_BY_ID_FAILURE",
  FETCH_PRODUCT_BY_ID_SUCCESS: "FETCH_PRODUCT_BY_ID_SUCCESS",

  UPDATE_PRODUCT_PENDING: "UPDATE_PRODUCT_PENDING",
  UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",

  DELETE_PRODUCT_PENDING: "DELETE_PRODUCT_PENDING",
  DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
};

export const ProductActions = {
  getProductList: async (dispatch, token, searchvalue = "") => {
    dispatch({ type: types.FETCH_PRODUCT_LIST_PENDING });
    let data = await SiteAPI.apiGetCall(`/product?search=${searchvalue}`, {}, token);
    console.log("data", data);
    if (data.error) {
      // alert(data.message);
      dispatch({
        type: types.FETCH_PRODUCT_LIST_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_PRODUCT_LIST_SUCCESS,
        productList: data.data,
      });
    }
  },
  getProductById: async (dispatch, id, token) => {
    dispatch({ type: types.FETCH_PRODUCT_BY_ID_PENDING });
    let data = await SiteAPI.apiGetCall(`/product/${id}`, {}, token);
    if (data.error) {
      // alert(data.message);
      dispatch({
        type: types.FETCH_PRODUCT_BY_ID_FAILURE,
        error: data.message,
      });
    } else {
      console.log("data", data.data);
      dispatch({
        type: types.FETCH_PRODUCT_BY_ID_SUCCESS,
        product: data.data,
      });
    }
  },
  createProduct: async (dispatch, params, token) => {
    dispatch({ type: types.FETCH_CREATE_PRODUCT_PENDING });
    let data = await SiteAPI.apiPostCall("/product", params, token);
    if (data.error) {
      // alert(data.message);
      dispatch({
        type: types.FETCH_CREATE_PRODUCT_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_CREATE_PRODUCT_SUCCESS,
      });
    }
  },

  updateProduct: async (dispatch, params, token) => {
    dispatch({ type: types.UPDATE_PRODUCT_PENDING });
    let data = await SiteAPI.apiPutCall(`/product/${params.id}`, params, token);
    if (data.error) {
      // alert(data.message);
      dispatch({
        type: types.UPDATE_PRODUCT_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.UPDATE_PRODUCT_SUCCESS,
      });
    }
  },

  deleteProduct: async (dispatch, params, token) => {
    dispatch({ type: types.DELETE_PRODUCT_PENDING });
    let data = await SiteAPI.apiDeleteCall(`/product/${params.id}`, params, token);
    if (data.error) {
      // alert(data.message);
      dispatch({
        type: types.DELETE_PRODUCT_FAILURE,
        error: data.message,
      });
    } else {
      dispatch({
        type: types.DELETE_PRODUCT_SUCCESS,
      });
    }
  },
};

const initialState = {
  isFetching: false,
  error: null,
  productList: [],
  product: {},
};

export const reducer = (state = initialState, action) => {
  const { type, error, productList, product } = action;
  switch (type) {
    case types.FETCH_PRODUCT_LIST_PENDING:
    case types.FETCH_CREATE_PRODUCT_PENDING:
    case types.FETCH_PRODUCT_BY_ID_PENDING:
    case types.UPDATE_PRODUCT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_PRODUCT_LIST_FAILURE:
    case types.FETCH_CREATE_PRODUCT_FAILURE:
    case types.FETCH_PRODUCT_BY_ID_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case types.FETCH_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        productList,
      };
    }

    case types.FETCH_CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    case types.FETCH_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        product,
      };
    }

    case types.UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
