import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { FirebaseContext } from "./Firebase";

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpPage = () => (
  <div className="card" style={{marginTop: "10%"}}>
      <div className="container" >
        <h1>SignUp</h1>
          <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase}/>}
          </FirebaseContext.Consumer>
      </div>
    </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}}
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}}
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}}
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}}
        />
        <button
          disabled={isInvalid}
          type="submit"
          style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}}
          >
            Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };