import { Dispatch } from "redux";
import { ActionTypes } from "./action-type";
import { getTodoListRequest } from "../../http/api";
import { Todo } from "./model";

export const initTodoListAction = (todoList: Todo[]) => ({
  type: ActionTypes.INIT_TODOLIST,
  data: todoList
});

export const changeInputValAction = (inputVal: string) => ({
  type: ActionTypes.CHANGE_INPUT_VALUE,
  data: inputVal
});

export const addTaskAction = (task: string) => ({
  type: ActionTypes.ADD_TASK,
  data: task
});

export const deleteTaskAction = (index: number) => ({
  type: ActionTypes.DELETE_TASK,
  payload: index
});

export const getTodoListAction = () => (dispatch: Dispatch) => {
  getTodoListRequest()
    .then(res => {
      dispatch(initTodoListAction(res.data.data));
    })
    .catch(err => console.log(err, "获取todo列表失败"));
};

interface InitTodoListAction {
  type: ActionTypes.INIT_TODOLIST;
  data: Todo[];
}

interface ChangeInputValAction {
  type: ActionTypes.CHANGE_INPUT_VALUE;
  data: string;
}

interface AddTaskAction {
  type: ActionTypes.ADD_TASK;
  data: string;
}

interface DeleteTaskAction {
  type: ActionTypes.DELETE_TASK;
  data: number;
}

export type Action =
  | InitTodoListAction
  | ChangeInputValAction
  | AddTaskAction
  | DeleteTaskAction;
