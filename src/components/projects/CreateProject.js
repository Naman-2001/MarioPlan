import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import { createStore } from "redux";

function CreateProject(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const [project, setProject] = useState({ title: "", content: "" });
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createProject(project));

    props.history.push("/");
  }

  function handleChange(e) {
    const { id, value } = e.target;

    setProject((prevValue) => {
      return {
        ...prevValue,
        [id]: value,
      };
    });
  }

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create Project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={project.title}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
            className="materialize-textarea"
            onChange={handleChange}
            value={project.content}
          ></textarea>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
