import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import * as ROUTES from "./constants/routes";
import { FirebaseContext } from './components/Firebase';

const firebase = require("firebase");

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userAuth: false,
            user: "",
        }
    }

    componentWillMount = () => {
        console.log(this.props)
        firebase.auth().onAuthStateChanged( user => {
            if (!user) {
                this.props.history.push(ROUTES.SIGN_UP);
            } else {
                this.setState({
                    userAuth: true,
                    user: user.email,
                })
            }
        })
    }


    render() {
        if (this.state.userAuth) {
        return (
            <React.Fragment>
                <FirebaseContext.Consumer>
                    {firebase => <Header user={this.state.user} firebase={firebase}/>}
                </FirebaseContext.Consumer>
                <FirebaseContext.Consumer>
                    {firebase => <TodoList user={this.state.user} firebase={firebase}/>}
                </FirebaseContext.Consumer>
                
            </React.Fragment>
        )} else {
            return null;
        }
    }
}

export default App;