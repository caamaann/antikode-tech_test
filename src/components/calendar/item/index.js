import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setEventData, setEventModal } from "../../../store/actions/event";
import { labelsClasses } from "../../../utils/constant";

const Index = ({ data, onSetEventModal, onSetEventData, dataEvent }) => {
  const [color, setColor] = useState([]);
  let date = data.formatDate;
  let listEvent = dataEvent.filter(
    (item) => item.date === date.format("YYYY-MM-DD")
  );
  let length = listEvent.length;

  const setModal = (modalType, isOpen, data) => {
    onSetEventModal(modalType, isOpen);
    onSetEventData(data);
  };

  const getColorRandom = (arr, num = 1) => {
    const res = [];
    for (let i = 0; i < num; ) {
      const random = Math.floor(Math.random() * arr.length);
      if (res.indexOf(arr[random]) !== -1) {
        continue;
      }
      res.push(arr[random]);
      i++;
    }
    setColor(res);
  };

  useEffect(() => {
    getColorRandom(labelsClasses, 3);
  }, []);

  return (
    <div
      className={`tw-border tw-relative tw-text-sm ${
        !data.isSameMonth && "tw-text-gray-400"
      }`}
    >
      <span
        className={`tw-absolute tw-top-0 tw-right-0 tw-p-1 ${
          data.isSameMonth ? "tw-cursor-pointer" : "tw-cursor-default"
        } tw-bg-white tw-border-l tw-border-b tw-rounded-bl `}
        onClick={() => data.isSameMonth && setModal("add", true, { date })}
      >
        {date.format("D")}
      </span>
      <div
        className={`tw-grid tw-grid-rows-${length} tw-h-full tw-flex-1 tw-gap-1 tw-px-1 md:tw-px-3 tw-py-1 tw-text-center tw-text-white`}
      >
        {listEvent.map((list, key) => {
          return (
            <div
              key={key}
              // className={`item-event tw-rounded tw-truncate ${color[key]} tw-flex tw-items-center tw-justify-start tw-cursor-pointer tw-px-2 tw-w-full`}
              className={`item-event tw-rounded tw-truncate ${list.color} tw-flex tw-items-center tw-justify-start tw-cursor-pointer tw-px-2 tw-w-full`}
              onClick={() => setModal("edit", true, list)}
            >
              {list.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ event: { data } }) => {
  let dataEvent = data;
  return { dataEvent };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEventModal: (modalType, isOpen) =>
      dispatch(setEventModal(modalType, isOpen)),
    onSetEventData: (data) => dispatch(setEventData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
