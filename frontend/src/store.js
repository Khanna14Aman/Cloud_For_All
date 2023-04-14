import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  getContactList,
  contactCreate,
  contactDelete,
  contactDeleteOne,
  contactUpdate,
  contactUpdateOne,
  oneContact,
  addOneContact,
} from "./reducers/contactReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  updateNote: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  contactList: getContactList,
  createContact: contactCreate,
  deleteContact: contactDelete,
  deleteOneContact: contactDeleteOne,
  updateContact: contactUpdate,
  updateOneContact: contactUpdateOne,
  getOneContact: oneContact,
  addOneContact: addOneContact,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
