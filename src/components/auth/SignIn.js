import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

function SignIn(props) {
  const [contact, setContact] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    props.signIn(contact);
    setContact({
      email: "",
      password: "",
    });
  }

  function handleChange(e) {
    const { id, value } = e.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [id]: value,
      };
    });
  }

  const { authError, auth } = props;

  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={contact.email}
            onChange={handleChange}
            autoComplete="none"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={contact.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
