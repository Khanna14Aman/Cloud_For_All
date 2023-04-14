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
  ONE_CONTACT_REQUEST,
  ONE_CONTACT_SUCCESS,
  ONE_CONTACT_FAIL,
  ADD_ONE_CONTACT_REQUEST,
  ADD_ONE_CONTACT_SUCCESS,
  ADD_ONE_CONTACT_FAIL,
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

export const getoneContact = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ONE_CONTACT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get(`/api/mycontact/${id}`, config);
    dispatch({ type: ONE_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ONE_CONTACT_FAIL, payload: message });
  }
};

export const createContact =
  (name, number, state, country, city, designation) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CONTACT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/mycontact/create`,
        { name, number, state, country, city, designation },
        config
      );
      dispatch({ type: CONTACT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteContact = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/mycontact/delete/${id}`, config);

    dispatch({
      type: CONTACT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateContact =
  (id, name, country, state, city, designation) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CONTACT_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearers ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/mycontact/update/${id}`,
        { name, state, country, city, designation },
        config
      );
      dispatch({ type: CONTACT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_UPDATE_FAIL, payload: message });
    }
  };

export const deleteOneContact =
  (contactId, numberId) => async (dispatch, getState) => {
    try {
      dispatch({ type: CONTACT_DELETEONE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.delete(
        `/api/mycontact/delete/${contactId}/${numberId}`,
        config
      );
      dispatch({ type: CONTACT_DELETEONE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_DELETEONE_FAIL, payload: message });
    }
  };

export const updateOneContact =
  (number, id, contactId) => async (dispatch, getState) => {
    try {
      dispatch({ type: CONTACT_UPDATEONE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/mycontact/update/${id}/${contactId}`,
        { number },
        config
      );
      dispatch({ type: CONTACT_UPDATEONE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_UPDATEONE_FAIL, payload: message });
    }
  };

export const addOneContact = (number, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ONE_CONTACT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/mycontact/addone/${id}`,
      { number },
      config
    );
    dispatch({ type: ADD_ONE_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADD_ONE_CONTACT_FAIL, payload: message });
  }
};
