import { connect } from "react-redux";
import moment from "moment";
import { dayShortest, dayLong } from "../../utils/constant";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SmallCalendar = ({ data, active, chosenDate }) => {
  let length = data.length / 7 + 1;

  const isCurrentDay = (day) => {
    let now = moment().get("D");
    let date = parseInt(day.formatDate.format("D"));

    if (date === now && day.isSameMonth) {
      return "tw-bg-blue-500 tw-rounded-full tw-text-white";
    } else if (!day.isSameMonth) {
      return "tw-text-gray-400";
    } else {
      return "";
    }
  };

  return (
    <div
      className={`tw-mt-20 tw-font-semibold tw-transition-all tw-duration-200 ${
        active ? "tw-opacity-100" : "tw-opacity-0"
      }`}
    >
      <header className="tw-flex">
        <p className="tw-text-gray-600 tw-text-sm tw-pl-3">
          {chosenDate.format("MMMM YYYY")}
        </p>
      </header>
      <div className={`tw-grid tw-grid-cols-7 tw-grid-rows-${length}`}>
        {dayShortest.map((day, idx) => (
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{dayLong[idx]}</Tooltip>}
            placement="bottom"
            key={idx}
          >
            <span className="tw-text-xs tw-py-1 tw-text-center tw-cursor-default">
              {day}
            </span>
          </OverlayTrigger>
        ))}
        {data.map((day, idx) => (
          <div className="tw-text-center" key={idx}>
            <span
              className={`tw-text-xs tw-py-1 tw-px-2 tw-cursor-default ${isCurrentDay(
                day
              )}`}
            >
              <span className="tw-text-xs">{day.formatDate.format("D")}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ calendar: { chosenDate, data } }) => {
  return { data, chosenDate };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallCalendar);
