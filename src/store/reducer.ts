import { combineReducers } from "redux";
import { reducer as todoReducer } from "../Todo/store";
import { State as TodoState } from "../Todo/store/reducer";

export default combineReducers({
  todo: todoReducer
});

export interface ToDoStore {
  todo: TodoState;
}
