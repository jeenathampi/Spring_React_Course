import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import setJwtToken from "../securityUtils/setJwtToken";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const login = loginRequest => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", loginRequest);
    if (res.data) {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setJwtToken(token);
      const decoded = jwt_decode(token);

      dispatch({ type: SET_CURRENT_USER, payload: decoded });
      dispatch({ type: GET_ERRORS, payload: {} });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: {
          username: "Invalid username",
          password: "Invalid password"
        }
      });
    }
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const logout = () => dipatch => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  dipatch({ type: SET_CURRENT_USER });
};
