import { tasksListReducer } from "./reducers/tasksListReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  tasksListReducer: tasksListReducer,
});

type reducersType = typeof reducers;

export type AppStateType = ReturnType<reducersType>;

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
