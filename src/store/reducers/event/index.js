import {
  GET_EVENT_PENDING,
  GET_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  POST_EVENT_PENDING,
  POST_EVENT_SUCCESS,
  POST_EVENT_ERROR,
  PUT_EVENT_PENDING,
  PUT_EVENT_SUCCESS,
  PUT_EVENT_ERROR,
  DELETE_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  EVENT_DATA,
  SET_EVENT_MODAL,
} from "../../actions/event";

const initialState = {
  pending: false,
  pending_post: false,
  pending_put: false,
  pending_delete: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_EVENT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_EVENT_PENDING:
      return {
        ...state,
        pending_post: true,
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        pending_post: false,
        data: action.data,
      };
    case POST_EVENT_ERROR:
      return {
        ...state,
        pending_post: false,
        error: action.error,
      };
    case PUT_EVENT_PENDING:
      return {
        ...state,
        pending_put: true,
      };
    case PUT_EVENT_SUCCESS:
      return {
        ...state,
        pending_put: false,
        data: action.data,
      };
    case PUT_EVENT_ERROR:
      return {
        ...state,
        pending_put: false,
        error: action.error,
      };
    case DELETE_EVENT_PENDING:
      return {
        ...state,
        pending_delete: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        pending_delete: false,
        data: action.data,
      };
    case DELETE_EVENT_ERROR:
      return {
        ...state,
        pending_delete: false,
        error: action.error,
      };
    case EVENT_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_EVENT_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default event;
