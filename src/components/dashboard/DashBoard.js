import React from "react";
import Notifications from "./Notification";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { createStore } from "redux";

function DashBoard(props) {
  const { projects, auth, notifications } = props;

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ProjectList projects={projects} />
        </div>
        <div className="col s12 m5 offset-m1">
          <Notifications notifications={notifications} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects",
      orderBy: ["createdAt", "desc"],
    },
    {
      collection: "notifications",
      limit: 3,
      orderBy: ["time", "desc"],
    },
  ])
)(DashBoard);
