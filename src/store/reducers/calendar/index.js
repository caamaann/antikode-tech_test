import {
  GET_CALENDAR_PENDING,
  GET_CALENDAR_SUCCESS,
  GET_CALENDAR_ERROR,
  CALENDAR_DATA,
  SET_CALENDAR_MODAL,
} from "../../actions/calendar";
import moment from "moment";

const initialState = {
  pending: false,
  error: null,
  data: [],
  chosenDate: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const calendar = (state = initialState, action) => {
  switch (action.type) {
    case GET_CALENDAR_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_CALENDAR_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data.data,
        chosenDate: action.data.date,
      };
    case GET_CALENDAR_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CALENDAR_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_CALENDAR_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default calendar;
