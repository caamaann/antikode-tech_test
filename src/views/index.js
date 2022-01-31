import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Navbar from "../components/navbar";
import Calendar from "../components/calendar";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Modal from "./modal";
import Event, { setEventData, setEventModal } from "../store/actions/event";
import CalendarGet from "../store/actions/calendar";

const Index = ({ onSetEventModal, onSetEventData, data }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(true);

  useEffect(() => {
    dispatch(CalendarGet.get());
    // dispatch(CalendarGet.get({ year: 2022, month: 3 }));
    handleMobileSize();
    handleRefresh();

    window.addEventListener("resize", () => handleMobileSize());
  }, []);

  const handleMobileSize = () => {
    if (window.innerWidth < 960) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  const styleButtonEvent = () => {
    if (isMobile) {
      return "tw-fixed tw-bottom-4 tw-right-4";
    } else {
      return "tw-absolute tw-top-4 tw-left-4";
    }
  };

  const handleRefresh = (reset) => {
    dispatch(Event.get());
  };

  const setModal = (modalType, isOpen, data) => {
    onSetEventModal(modalType, isOpen);
    onSetEventData(data);
  };

  return (
    <div className="tw-h-screen tw-flex tw-flex-col tw-antialiased tw-text-slate-800 tw-bg-white">
      {data && data.length > 0 ? (
        <>
          <Navbar toggle={toggleSidebar} isMobile={isMobile} />
          <Modal handleRefresh={handleRefresh} />
          <div className="tw-flex tw-flex-1 tw-px-4 tw-relative tw-overflow-auto">
            {!isMobile && <Sidebar active={activeSidebar} />}
            <Calendar isMobile={isMobile} />
            <Button
              rounded
              title={!isMobile && activeSidebar ? "Add Event" : ""}
              leftIcon="add"
              onClick={() => setModal("add", true, null)}
              className={`tw-p-4 tw-bg-white tw-border-gray-200
          hover:tw-drop-shadow-xl tw-drop-shadow-md tw-transition-all ${styleButtonEvent()}`}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = ({ calendar: { data, chosenDate } }) => {
  return { data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEventModal: (modalType, isOpen) =>
      dispatch(setEventModal(modalType, isOpen)),

    onSetEventData: (data) => dispatch(setEventData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
