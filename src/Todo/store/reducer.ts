import { ActionTypes } from "./action-type";
import { Todo } from "./model";
import { Action } from "./action";

export interface State {
  inputVal: string;
  todoList: Todo[];
}

const defaultState: State = {
  todoList: [],
  inputVal: ""
};

const handleAddTask = (state: State, task: string) => {
  if (!task) {
    alert("请输入用户名");
    return state;
  }
  const todo = {
    task
  };
  return {
    ...state,
    todoList: [...state.todoList, todo],
    inputVal: ""
  };
};

export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputVal: action.data
      };
    case ActionTypes.INIT_TODOLIST:
      return {
        ...state,
        todoList: action.data
      };
    case ActionTypes.ADD_TASK:
      return handleAddTask(state, action.data);
    case ActionTypes.DELETE_TASK:
      const todoList = [...state.todoList];
      todoList.splice(action.data, 1);
      return {
        ...state,
        todoList: [...todoList]
      };
    default:
      return state;
  }
};
