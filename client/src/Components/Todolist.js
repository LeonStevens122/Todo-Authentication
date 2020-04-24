import React, { Component } from 'react';
import TodoListItem from './TodoListItem';
import Axios from 'axios';
import * as session from 'express-session';
import { JSONCookie } from 'cookie-parser';
class TodoList extends Component {

    // Load Lsit of Cars to be displayed
    componentDidMount() {
        var myRequest = new Request('http://localhost:3001/todo');

        console.log('Credentials ');
       


           
        }

    render() {
        // map through items array recieved from component props and create TodoList Item
        // for each object in the array,
        let items = this.props.items.map((item, index) => {
            return (
                <TodoListItem
                    key={index}
                    item={item}
                    index={index}
                    removeItem={this.props.removeItem}
                    markTodoDone={this.props.markTodoDone}
                />
            );
        });
        return (
            // return an unordered list component with the items as created by the map method
            <ul className="list-group"> {items} </ul>
        );
    }
}

export default TodoList;