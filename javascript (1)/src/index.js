import React from "react";
import { render } from "react-dom";
import Hello from "./index";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// adding primary key type functionality to every task so that we can identify them
let id = 0;
// component Task
const Todo = props => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />
    <button onClick={props.onDelete}> delete </button>
    <span> {props.todo.text} </span>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("To DO Text please");
    // setstate updates the ui
    this.setState({
      // ... clones an array
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
  render() {
    return (
      <div>
        <div> To do Count: {this.state.todos.length}</div>
        <div>
          To do Unchecked Count:
          {this.state.todos.filter(todo => !todo.checked).length}
        </div>
        <button onClick={() => this.addTodo()}>Add ToDO</button>
        <ul>
          # adding text and deleting
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
