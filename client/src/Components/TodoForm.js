import React, { Component } from 'react';

// TodoForm component
class TodoForm extends Component {
  // bind event handling
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // use the refs - we can update the single element without re-rendering the entire component
    componentDidMount() {


    this.refs.itemName.focus();
  }

  // event handling for the onsubmit button

  onSubmit(event) {
    // preventDefault prevents the form from reloading when the submit button is clicked
    event.preventDefault();
    // use refs to access the value of the text input element directly in the DOM
    // using refs we can get access to the input text value and use the DOM  form Reset method to clear the user input
    // without needing to reload the entire form with blank inputs
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }


  

    render() {
    return (
      // return a form component with refs to access DOM Form methods and provide easier access to th input fields values

      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input
          type="text"
          ref="itemName"
          className="form-control"
          placeholder="add a new todo..."
        />
        <button type="submit" className="btn btn-default">
          Add
        </button>
      </form>
    );
  }
}

export default TodoForm;