import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "../../components/button";
import Event from "../../store/actions/event";
import { formInput } from "../../components/forms";
import MultiInputEmail from "../../components/forms/multiInput";

let Index = ({
  handleClose,
  handleSubmit,
  handleRefresh,
  detailData,
  chosenDate,
  pending_put,
  invitedEmail,
}) => {
  const [emailInvite, setEmailInvite] = useState(invitedEmail);
  const dispatch = useDispatch();

  const onSubmit = ({ name, date, time }) => {
    let temp = emailInvite.map((item) => item.value);
    const param = {
      id: detailData.id,
      name,
      emailInvite: temp,
      date,
      time,
    };

    const callback = () => {
      handleClose();
      handleRefresh();
    };
    dispatch(Event.put(param, callback));
  };

  const handleValue = (val) => {
    setEmailInvite(val);
  };

  const handleDelete = () => {
    const callback = () => {
      handleClose();
      handleRefresh();
    };
    dispatch(Event.deleted(detailData.id, callback));
  };

  return (
    <>
      <ModalHeader closeButton className="tw-bg-gray-200">
        Edit Event
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
              disabled
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
          <div className="tw-flex tw-justify-between tw-mt-4">
            <Button
              rounded
              title="Delete"
              color="danger"
              leftIcon="delete"
              onClick={handleDelete}
              disabled={pending_put}
              className="tw-px-4 tw-py-2"
            />
            <div className="tw-flex tw-justify-end tw-gap-4">
              <Button
                rounded
                title="Cancel"
                color="secondary"
                leftIcon="close"
                onClick={handleClose}
                disabled={pending_put}
                className="tw-px-4 tw-py-2"
              />
              <Button
                rounded
                title="Save"
                type="submit"
                color="primary"
                leftIcon="save"
                disabled={pending_put}
                className="tw-px-4 tw-py-2"
              />
            </div>
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

Index = reduxForm({
  form: "eventEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({
  event: { pending_put, detailData },
  calendar: { chosenDate },
}) => {
  let initialValues = {};
  let invitedEmail = [];
  if (detailData) {
    initialValues = {
      name: detailData.name,
      date: detailData.date,
      time: detailData.time,
    };
    invitedEmail = detailData.emailInvite.map((item) => ({
      value: item,
      label: item,
    }));
  }

  return { initialValues, pending_put, detailData, invitedEmail, chosenDate };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
