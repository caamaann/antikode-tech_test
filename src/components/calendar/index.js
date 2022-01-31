import { connect } from "react-redux";
import CalendarItem from "./item";
import { dayShort, dayLong } from "../../utils/constant";

const Calendar = ({ data, isMobile }) => {
  let length = data.length / 7;
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-max-w-[100vw]">
      <div className="tw-grid tw-grid-cols-[repeat(7,_minmax(150px,_1fr))]">
        {isMobile
          ? dayShort.map((day, idx) => (
              <span className="tw-text-center tw-py-2" key={idx}>
                {day.toUpperCase()}
              </span>
            ))
          : dayLong.map((day, idx) => (
              <span className="tw-text-center tw-py-2" key={idx}>
                {day}
              </span>
            ))}
      </div>
      <div
        className={`tw-flex-1 tw-grid tw-grid-cols-[repeat(7,_minmax(150px,_1fr))] tw-grid-rows-${length}`}
      >
        {data.map((day, idx) => (
          <CalendarItem data={day} key={idx} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ calendar: { data } }) => {
  return { data };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
