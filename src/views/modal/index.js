import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { setEventModal } from "../../store/actions/event";
import Add from "./add";
import Edit from "./edit";

const index = ({
  isOpenModal,
  modalType,
  onSetEventModal,
  handleRefresh,
  detailData,
}) => {
  const handleClose = () => onSetEventModal("", false);

  const child = (modalType) => {
    switch (modalType) {
      case "add":
        return <Add handleRefresh={handleRefresh} handleClose={handleClose} />;
      case "edit":
        return (
          <Edit
            handleRefresh={handleRefresh}
            handleClose={handleClose}
            type="edit"
          />
        );
      case "detail":
        return (
          <Edit
            handleRefresh={handleRefresh}
            handleClose={handleClose}
            type="detail"
          />
        );
      default:
        return null;
    }
  };
  return (
    <Modal show={isOpenModal} onHide={handleClose} centered>
      {child(modalType)}
    </Modal>
  );
};

const mapStateToProps = ({ event: { isOpenModal, modalType, detailData } }) => {
  return { isOpenModal, modalType, detailData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEventModal: (type, isOpen) => dispatch(setEventModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
