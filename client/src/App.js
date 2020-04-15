import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import React, { Component } from "react";
import { FormAddCars } from "./Components/AddForm";
import { ShowCars } from "./Components/ListCars";
import Header from "./Components/header";
import { SearchForm } from "./Components/SearchForm";
import { Button } from "react-bootstrap";
import { FormUpdateCars } from "./Components/UpdateForm";
import { FormUpdateOne } from './Components/UpdateOne';
import { DeleteOne } from './Components/DeleteOne';
import Axios from "axios";



class App extends Component {
    constructor() {
        super();
        this.state = {
            carList: [],
            selectedCar: null
        };

    }

    componentDidMount() {
       
        Axios.get("./cars/").then( (result) => {
            const carData = result.data;
            this.setState({ carList: carData });
                  
        });

    }

    render() {

        return (
            <div className="App">
                <Router>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.
            methods are rendered as props to enable state to be raised 
            */}
                    <Header />

                    <Switch>
                        <Route exact={true} path="/">
                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/List">
                            <ShowCars carList={this.state.carList} />
                        </Route>
                        <Route path="/Search">
                            <SearchForm />
                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/AddItem">
                            <FormAddCars />
                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/Update">
                            <FormUpdateOne carList={this.state.carList} />
                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/UpdateAll">
                            <FormUpdateCars />
                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/DeleteOne">
                            <DeleteOne />

                            <ShowCars carList={this.state.carList} />
                        </Route>

                        <Route path="/DeleteAll">
                            <Button onClick={console.log("button clicked")}>
                                {" "}
              Delete All Items{" "}
                            </Button>

                            <ShowCars carList={this.state.carList} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
export default App;
