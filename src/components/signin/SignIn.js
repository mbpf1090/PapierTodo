import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../signup/SignUp';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import "./styles.css";

const SignInPage = () => (
    <div className="cardSign">
        <div className="containerSign" >
            <h1 classname="headerSign">Sign In</h1>
            <FirebaseContext.Consumer>
                {firebase => <SignInForm firebase={firebase}/>}
            </FirebaseContext.Consumer>
            <SignUpLink />
        </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push({ pathname: ROUTES.HOME, state: { user: email }});
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
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
        <form onSubmit={this.onSubmit}>
            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                className="centeredSign"
            />
            <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                className="centeredSign"
            />
            <button
                disabled={isInvalid}
                type="submit"
                className="btncenteredSign"
            >
                Sign In
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
  }
}

const SignInForm = withRouter(SignInFormBase);


export default SignInPage;
export { SignInForm };