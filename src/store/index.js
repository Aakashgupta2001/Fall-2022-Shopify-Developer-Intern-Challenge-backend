import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import { reducer as AuthRedux } from "./AuthRedux";
import { reducer as ProductRedux } from "./ProductRedux";

const config = {
  key: "root",
  storage,
  blacklist: [],
};
export default persistCombineReducers(config, {
  auth: AuthRedux,
  product: ProductRedux,
});
