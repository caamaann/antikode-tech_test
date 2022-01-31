import { STORAGE_KEY } from "../../../utils/constant";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_EVENT_PENDING = "GET_EVENT_PENDING";
export const GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
export const GET_EVENT_ERROR = "GET_EVENT_ERROR";
export const POST_EVENT_PENDING = "POST_EVENT_PENDING";
export const POST_EVENT_SUCCESS = "POST_EVENT_SUCCESS";
export const POST_EVENT_ERROR = "POST_EVENT_ERROR";
export const PUT_EVENT_PENDING = "PUT_EVENT_PENDING";
export const PUT_EVENT_SUCCESS = "PUT_EVENT_SUCCESS";
export const PUT_EVENT_ERROR = "PUT_EVENT_ERROR";
export const DELETE_EVENT_PENDING = "DELETE_EVENT_PENDING";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_ERROR = "DELETE_EVENT_ERROR";

export const EVENT_DATA = "EVENT_DATA";
export const SET_EVENT_MODAL = "SET_EVENT_MODAL";

const checkStorage = () => {
  return typeof Storage !== "undefined";
};

const get = (param) => (dispatch) => {
  dispatch(actionPending(GET_EVENT_PENDING));
  if (checkStorage) {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      data = JSON.parse(data);
    }
    dispatch(actionSuccess(GET_EVENT_SUCCESS, data ?? []));
    return data;
  } else {
    let err = "Your browser not supported Web Storage";
    dispatch(actionError(GET_EVENT_ERROR, err));
    Swal.fire("Error", err, "error");
  }
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_EVENT_PENDING));
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  let totalEvent = data.filter((item) => item.date === param.date).length;
  if (totalEvent < 3) {
    let id = uuidv4();

    param.id = id;
    let newData = [...data, param];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

    dispatch(actionSuccess(POST_EVENT_SUCCESS, newData));
    if (callback) {
      callback();
    }
    return newData;
  } else {
    let err = "Cannot create event more than 3 in same day";
    dispatch(actionError(POST_EVENT_ERROR, err));
    Swal.fire("Warning", err, "warning");
  }
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_EVENT_PENDING));
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  let idxItem = data.map((item) => item.id).indexOf(param.id);
  if (idxItem > -1) {
    data[idxItem] = param;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  dispatch(actionSuccess(PUT_EVENT_SUCCESS, data));
  if (callback) {
    callback();
  }
  return data;
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_EVENT_PENDING));
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  let idxItem = data.map((item) => item.id).indexOf(param);
  if (idxItem > -1) {
    data.splice(idxItem, 1);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  dispatch(actionSuccess(DELETE_EVENT_SUCCESS, data));
  if (callback) {
    callback();
  }
  return data;
};

const event = { get, post, put, deleted };
export default event;

export const setEventData = (data) => (dispatch) =>
  dispatch({ type: EVENT_DATA, data });

export const setEventModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_EVENT_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
