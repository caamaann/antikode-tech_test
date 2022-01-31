import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { getDaysArray } from "../../../utils/date";
import moment from "moment";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_CALENDAR_PENDING = "GET_CALENDAR_PENDING";
export const GET_CALENDAR_SUCCESS = "GET_CALENDAR_SUCCESS";
export const GET_CALENDAR_ERROR = "GET_CALENDAR_ERROR";

export const CALENDAR_DATA = "CALENDAR_DATA";
export const SET_CALENDAR_MODAL = "SET_CALENDAR_MODAL";

const get = (param) => (dispatch) => {
  dispatch(actionPending(GET_CALENDAR_PENDING));
  let data = param
    ? getDaysArray(parseInt(param.year), parseInt(param.month))
    : getDaysArray();
  let date = param
    ? moment()
        .year(param.year)
        .month(parseInt(param.month) - 1)
        .date(1)
    : moment();

  document.title = "Calendar - " + date.format("MMMM YYYY");
  dispatch(actionSuccess(GET_CALENDAR_SUCCESS, { data, date }));
};

const calendar = { get };
export default calendar;

export const setCalendarData = (data) => (dispatch) =>
  dispatch({ type: CALENDAR_DATA, data });

export const setCalendarModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_CALENDAR_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
