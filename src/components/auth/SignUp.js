import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";

function SignUp(props) {
  const [contact, setContact] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.signUp(contact);
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
        <h5 className="grey-text text-darken-3">Sign Up</h5>
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={contact.firstName}
            onChange={handleChange}
            autoComplete="none"
          />
        </div>

        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={contact.lastName}
            onChange={handleChange}
            autoComplete="none"
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
