import React, { Component } from "react";
import { Input, Button, List } from "antd";
import {
  TodoTitleStyle,
  TodoInputStyle,
  TodoItemStyle,
  TodoStyle
} from "./style";

interface TodoInputProps {
  inputVal: string;
  addTask: (task: string) => void;
  changeInputValue: (val: string) => void;
}

function TodoInput(props: TodoInputProps) {
  const { inputVal, addTask, changeInputValue } = props;
  return (
    <TodoInputStyle>
      <Input
        value={inputVal}
        onChange={(e: any) => changeInputValue(e.target.value)}
      />
      <Button type="primary" onClick={() => addTask(inputVal)}>
        Add Task
      </Button>
    </TodoInputStyle>
  );
}

interface TodoListProps {
  todoList: string[];
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
            {todo}
          </List.Item>
        )}
      />
    </TodoItemStyle>
  );
}

interface TodoProps {
  title: string;
}

interface TodoState {
  inputVal: string;
  todoList: string[];
}

class Todo extends Component<TodoProps, TodoState> {
  state: TodoState = {
    inputVal: "",
    todoList: ["学习", "睡觉"]
  };

  static defaultProps = {
    title: "todos"
  };

  addTask = (task: string) => {
    if (!task) {
      alert("请输入任务");
      return;
    }

    this.setState(state => ({
      todoList: [...state.todoList, task],
      inputVal: ""
    }));
  };

  changeInputValue = (val: string) => {
    this.setState(() => ({
      inputVal: val
    }));
  };

  deleteTask = (index: number) => {
    const todoList = [...this.state.todoList];
    todoList.splice(index, 1);
    this.setState(() => ({
      todoList
    }));
  };

  render() {
    return (
      <TodoStyle>
        <TodoTitleStyle>{this.props.title}</TodoTitleStyle>
        <TodoInput
          inputVal={this.state.inputVal}
          addTask={this.addTask}
          changeInputValue={this.changeInputValue}
        />
        <TodoList todoList={this.state.todoList} deleteTask={this.deleteTask} />
      </TodoStyle>
    );
  }
}

export default Todo;
