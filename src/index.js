import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import * as ROUTES from "./constants/routes";
import Firebase, { FirebaseContext } from "./components/Firebase"

ReactDOM.render(
    <Router>
            <FirebaseContext.Provider value={new Firebase()}>
                <div>
                    <Route exact path={ROUTES.HOME} component={App}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                    <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                </div>
        </FirebaseContext.Provider>
    </Router>
    , document.getElementById("root"));
