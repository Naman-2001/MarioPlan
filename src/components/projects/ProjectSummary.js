import React from "react";
import moment from "moment";

function ProjectSummary(props) {
  const { project } = props;

  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>
          Posted by {project.authorFirstName} {project.authorLastName}{" "}
        </p>
        <p className="grey-text">
          {moment(project.createdAt.toDate()).calendar()}
        </p>
      </div>
    </div>
  );
}

export default ProjectSummary;
// {moment(project.createdAt.toDate())}
