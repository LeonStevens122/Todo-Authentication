import React, { Component } from 'react';
 
// create TodoList item
class TodoListItem extends Component {
    // constructor binds the event handling to the component
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    // event handling for the close button
    // removes the item from the screen and removes it from the array
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    // event handling for the done event,
    // changes the display of the item to be crossed out and text color becomes red
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    // render the component
    render() {
        // ternary operator sets the done value of the done value in the variable to done or undone
        var todoClass = this.props.item.done ? "done" : "undone";

        // returns the TodoList Item Component used in the TodoList Component,
        //
        return (
            <li className="list-group-item ">
                <div className={todoClass}>
                    <span
                        className="glyphicon glyphicon-ok icon"
                        aria-hidden="true"
                        onClick={this.onClickDone}
                    />
                    {this.props.item.value}
                    <button type="button" className="close" onClick={this.onClickClose}>
                        &times;
          </button>
                </div>
            </li>
        );
    }
}

export default TodoListItem;
