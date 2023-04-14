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

export const getContactList = (state = { contact: [] }, action) => {
  switch (action.type) {
    case GET_CONTACT_REQUEST:
      return { loading: true };
    case GET_CONTACT_SUCCESS:
      return { contact: action.payload };
    case GET_CONTACT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const contactCreate = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_CREATE_REQUEST:
      return { loading: true };
    case CONTACT_CREATE_SUCCESS:
      return { success: true };
    case CONTACT_CREATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const contactDelete = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { success: true };
    case CONTACT_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const contactUpdate = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_UPDATE_REQUEST:
      return { loading: true };
    case CONTACT_UPDATE_SUCCESS:
      return { success: true };
    case CONTACT_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const contactDeleteOne = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETEONE_REQUEST:
      return { loading: true };
    case CONTACT_DELETEONE_SUCCESS:
      return { success: true };
    case CONTACT_DELETEONE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const contactUpdateOne = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_UPDATEONE_REQUEST:
      return { loading: true };
    case CONTACT_UPDATEONE_SUCCESS:
      return { success: true };
    case CONTACT_UPDATEONE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const oneContact = (state = {}, action) => {
  switch (action.type) {
    case ONE_CONTACT_REQUEST:
      return { loading: true };
    case ONE_CONTACT_SUCCESS:
      return { oneContact: action.payload };
    case ONE_CONTACT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const addOneContact = (state = {}, action) => {
  switch (action.type) {
    case ADD_ONE_CONTACT_REQUEST:
      return { loading: true };
    case ADD_ONE_CONTACT_SUCCESS:
      return { success: true };
    case ADD_ONE_CONTACT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
