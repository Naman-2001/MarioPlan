import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import moment from "moment";

function ProjectDetails(props) {
  const { project, auth } = props;

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card content z-depth-0 detailedCard">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey grey-text lighten-4 detailedCard">
            <div>
              Posted By {project.authorFirstName} {project.authorLastName}
            </div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="container center">Loading Page....</div>;
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  console.log(state);
  const projects = state.firestore.data.projects;
  const desiredProject = projects ? projects[id] : null;

  return {
    project: desiredProject,
    auth: state.firebase.auth,
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects",
    },
  ])
)(ProjectDetails);
