import {
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETEONE_REQUEST,
  CONTACT_DELETEONE_SUCCESS,
  CONTACT_DELETEONE_FAIL,
  CONTACT_UPDATE_REQUEST,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_FAIL,
  CONTACT_UPDATEONE_REQUEST,
  CONTACT_UPDATEONE_SUCCESS,
  CONTACT_UPDATEONE_FAIL,
} from "../constants/contactConstants";

import axios from "axios";

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONTACT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/mycontact", config);
    // console.log(data);
    dispatch({
      type: GET_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_CONTACT_FAIL,
      payload: message,
    });
  }
};
