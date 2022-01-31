import { connect } from "react-redux";
import logo from "../../assets/img/calendar_26.png";
import LogoGit from "../../assets/icon/icon-git";

const Navbar = ({ toggle, chosenDate, isMobile }) => {
  return (
    <header className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-between tw-border-b">
      <div className="tw-flex tw-items-center">
        {!isMobile && (
          <span
            className="material-icons-round tw-mr-4 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 tw-rounded-full"
            onClick={toggle}
          >
            menu
          </span>
        )}
        <figure className="tw-relative tw-flex tw-items-center tw-m-0">
          <img src={logo} alt="calendar" className="tw-mr-2 tw-w-12 tw-h-12" />
          <figcaption className="tw-absolute tw-left-4 tw-text-blue-500 tw-font-semibold">
            {chosenDate.format("DD")}
          </figcaption>
        </figure>
        {/* <img src={logo} alt="calendar" className="tw-mr-2 tw-w-12 tw-h-12" /> */}
        <h2 className="tw-mr-10 tw-text-xl tw-text-gray-600 tw-mb-0">
          Calendar
        </h2>
      </div>
      <div className="tw-flex tw-items-center">
        <h2 className="tw-mx-4 tw-text-xl tw-text-gray-600 tw-mb-0">
          {chosenDate.format("MMMM YYYY")}
        </h2>
        <LogoGit
          className="tw-fill-gray-500 hover:tw-fill-gray-600 tw-cursor-pointer"
          onClick={(e) =>
            (window.location.href = "https://github.com/caamaann")
          }
        />
      </div>
    </header>
  );
};

const mapStateToProps = ({ calendar: { chosenDate } }) => {
  return { chosenDate };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
