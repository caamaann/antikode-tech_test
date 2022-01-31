import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "../../components/button";
import Event from "../../store/actions/event";
import { formInput } from "../../components/forms";
import MultiInputEmail from "../../components/forms/multiInput";
import ColorInput from "../../components/forms/color";

let Add = ({
  handleClose,
  handleSubmit,
  handleRefresh,
  chosenDate,
  pending_post,
}) => {
  const [emailInvite, setEmailInvite] = useState([]);
  const [colorChosen, setColorChosen] = useState("indigo");
  const dispatch = useDispatch();

  const onSubmit = ({ name, date, time }) => {
    let temp = emailInvite.map((item) => item.value);
    const param = {
      name,
      emailInvite: temp,
      date,
      time,
      color: colorChosen,
    };

    const callback = () => {
      handleClose();
      handleRefresh();
    };
    dispatch(Event.post(param, callback));
  };

  const handleValue = (val) => {
    setEmailInvite(val);
  };
  return (
    <>
      <ModalHeader closeButton className="tw-bg-gray-200">
        Add Event
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="name"
            label="Name"
            placeholder="Insert event name"
            component={formInput}
            required
          />
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <Field
              name="date"
              label="Date"
              placeholder="Insert event date"
              type="date"
              min={chosenDate.clone().startOf("month").format("YYYY-MM-DD")}
              max={chosenDate.clone().endOf("month").format("YYYY-MM-DD")}
              component={formInput}
              required
            />
            <Field
              name="time"
              label="Time"
              placeholder="Insert event time"
              type="time"
              component={formInput}
            />
          </div>
          <MultiInputEmail
            label="Invitees by email"
            handleValue={handleValue}
            propsValue={emailInvite}
          />
          <ColorInput
            label="Color"
            handleValue={(val) => setColorChosen(val)}
            propsValue={colorChosen}
            required
          />
          <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-4">
            <Button
              rounded
              title="Cancel"
              color="secondary"
              leftIcon="close"
              onClick={handleClose}
              disabled={pending_post}
              className="tw-px-4 tw-py-2"
            />
            <Button
              rounded
              title="Save"
              type="submit"
              color="primary"
              leftIcon="save"
              disabled={pending_post}
              className="tw-px-4 tw-py-2"
            />
          </div>
        </form>
      </ModalBody>
    </>
  );
};

const validate = ({ name, date }) => {
  const errors = {};

  if (!name) {
    errors.name = "Required!";
  }

  if (!date) {
    errors.date = "Required!";
  }

  return errors;
};

Add = reduxForm({
  form: "eventAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({
  event: { pending_post, detailData },
  calendar: { chosenDate },
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      date: detailData.date.format("YYYY-MM-DD"),
    };
  }

  return { pending_post, chosenDate, initialValues };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
