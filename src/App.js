import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import * as ROUTES from "./constants/routes";

const firebase = require("firebase");

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userAuth: false,
        }
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged( user => {
            if (!user) {
                this.props.history.push(ROUTES.SIGN_UP);
            } else {
                this.setState({
                    userAuth: true
                })
            }
        })
    }

    render() {
        if (this.state.userAuth) {
        return (
            <React.Fragment>
                <Header/>
                <TodoList/>
            </React.Fragment>
        )} else {
            return null;
        }
    }
}

export default App;