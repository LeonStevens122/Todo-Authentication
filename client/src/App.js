import React from "react";
import Login from './Components/Login';
import TodoList from "./Components/Todolist";
import TodoForm from "./Components/TodoForm";

// import TodoListItem from './components/TodoListItem';
import Axios from "axios";
import TodoHeader from "./Components/TodoHeader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
const passport = require("passport");

// set initial values of todo List for demonstration purposes
var todoItems = [];
todoItems.push({ index: 1, value: "Item 1", done: false });
todoItems.push({ index: 2, value: "Item 2", done: false });
todoItems.push({ index: 3, value: "Item 3", done: true });

// React Component to be exported to the index.js file to be rendered
class TodoApp extends React.Component {
  // constructor method - sets initial state and binds event handling

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
      this.state = {
          loggedIn: false,
      todoItems: todoItems,
      user: {}
    };
  }

  // additem method adds the new item to the ToDo Items array using unShift, to add the item to the front of the array
  //sets the value of the Index and sets the done value to false

  googleLogin() {
    console.log(" Axios Running : ");
    Axios.get(
      "./auth/google",
      passport.authenticate("google", {
        scope: ["profile"]
      })
    );
  }

  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }

  // remove item uses the splice array method to remove the selected item from the TodoITems array
  // and updates the state with the new array
  removeItem(itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }

  // sets the done value of the selected item to the oposite of the current value
  // methid then uses splice to take the item out of the array and the rendered list
  // then uses a ternary operator to reinsert the item either to the front or back of the array
  // resulting in the specific item being rendered either on the top or bottom of the list
  // depending on the boolean "done" value

  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }


   

  // render the react components in a single Div to be rendered by the Index.js file
  render() {
    return (
      <div>
        <TodoHeader user={"something"} loggedIn={false} />
        <div id="main">
          <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.
            methods are rendered as props to enable state to be raised 
            */}
            <Switch>
              <Route path="/Login">
                <div id="main">
                  <Login googleLogin={this.googleLogin} />
                </div>
              </Route>

              <Route path="/Todo">
                <div id="main">
                  <TodoList
                    className="TodoList"
                    items={this.props.initItems}
                    removeItem={this.removeItem}
                                    markTodoDone={this.markTodoDone}

                  />
                  <TodoForm addItem={this.addItem} />
                </div>
              </Route>

              <Route exact={true} path="/">
                <h1>Please Log in to Continue</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <TodoApp initItems={todoItems} />;
  }
}

export default App;
