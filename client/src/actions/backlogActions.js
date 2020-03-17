import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  backlog_id,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, projectTask);

    history.push(`/projectBoard/${backlog_id}`);
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getBacklog = (backlog_id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);

    dispatch({ type: GET_BACKLOG, payload: res.data });
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjectTask = (
  backlog_id,
  project_sequence
) => async dispatch => {
  const res = await axios.get(`/api/backlog/${backlog_id}/${project_sequence}`);

  dispatch({ type: GET_PROJECT_TASK, payload: res.data });
};

export const updateProjectTask = (
  projectTask,
  backlog_id,
  project_sequence,
  history
) => async dispatch => {
  try {
    await axios.patch(
      `/api/backlog/${backlog_id}/${project_sequence}`,
      projectTask
    );
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteProjectTask = (
  backlog_id,
  project_sequence
) => async dispatch => {
  await axios.delete(`/api/backlog/${backlog_id}/${project_sequence}`);
  dispatch({ type: DELETE_PROJECT_TASK, payload: project_sequence });
};
