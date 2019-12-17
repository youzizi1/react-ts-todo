import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, List } from "antd";
import {
  TodoTitleStyle,
  TodoInputStyle,
  TodoItemStyle,
  TodoStyle
} from "./style";
import { Todo as TodoModel } from "./store/model";
import {
  getTodoListAction,
  addTaskAction,
  changeInputValAction,
  deleteTaskAction
} from "./store/action";
import { ToDoStore } from "../store/reducer";

interface TodoInputProps {
  inputVal: string;
  addTask: (task: string) => void;
  changeInputVal: (val: string) => void;
}

function TodoInput(props: TodoInputProps) {
  const { inputVal, addTask, changeInputVal } = props;

  return (
    <TodoInputStyle>
      <Input
        value={inputVal}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          changeInputVal(e.currentTarget.value)
        }
      />
      <Button type="primary" onClick={() => addTask(inputVal)}>
        Add Task
      </Button>
    </TodoInputStyle>
  );
}

interface TodoListProps {
  todoList: TodoModel[];
  deleteTask: (index: number) => void;
}

function TodoList(props: TodoListProps) {
  const { todoList, deleteTask } = props;

  return (
    <TodoItemStyle>
      <List
        bordered
        dataSource={todoList}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                type="danger"
                size="small"
                onClick={() => deleteTask(index)}
              >
                delete
              </Button>
            ]}
          >
            {todo.task}
          </List.Item>
        )}
      />
    </TodoItemStyle>
  );
}

interface TodoProps {
  title: string;
  inputVal: string;
  todoList: TodoModel[];
  getTodoList: () => void;
  addTask: (task: string) => void;
  changeInputVal: (val: string) => void;
  deleteTask: (index: number) => void;
}

class Todo extends Component<TodoProps, {}> {
  static defaultProps = {
    title: "todos"
  };

  componentDidMount() {
    this.props.getTodoList();
  }

  render() {
    const {
      title,
      inputVal,
      addTask,
      changeInputVal,
      todoList,
      deleteTask
    } = this.props;

    return (
      <TodoStyle>
        <TodoTitleStyle>{title}</TodoTitleStyle>
        <TodoInput
          inputVal={inputVal}
          addTask={addTask}
          changeInputVal={changeInputVal}
        />
        <TodoList todoList={todoList} deleteTask={deleteTask} />
      </TodoStyle>
    );
  }
}

const mapStateToProps = (state: ToDoStore) => {
  return {
    inputVal: state.todo.inputVal,
    todoList: state.todo.todoList
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getTodoList() {
    dispatch(getTodoListAction());
  },
  addTask(task: string) {
    dispatch(addTaskAction(task));
  },
  changeInputVal(val: string) {
    dispatch(changeInputValAction(val));
  },
  deleteTask(index: number) {
    dispatch(deleteTaskAction(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
