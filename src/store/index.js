import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const reducersStore = createStore(rootReducer);

export default reducersStore;
