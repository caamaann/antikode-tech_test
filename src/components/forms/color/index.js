import React, { useState } from "react";
import { labelsClasses } from "../../../utils/constant";

const Color = ({
  handleValue,
  propsValue,
  label,
  isError,
  required,
  ...props
}) => {
  const [value, setValue] = useState(propsValue);

  const handleChange = (val) => {
    setValue(val);
    if (handleValue) {
      handleValue(val);
    }
  };
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="tw-text-red-600">*</span>}
        </label>
      )}
      <div className="tw-flex tw-gap-x-2">
        {labelsClasses.map((lblClass, i) => (
          <span
            key={i}
            onClick={() => handleChange(lblClass)}
            className={`item-event ${lblClass} tw-w-6 tw-h-6 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer`}
          >
            {value === lblClass && (
              <span className="material-icons-outlined tw-text-white tw-text-sm">
                check
              </span>
            )}
          </span>
        ))}
      </div>
      {isError && (
        <>
          <div className="mb-1"></div>
          <span className="form-validation">Required</span>
          <div className="mb-3"></div>
        </>
      )}
    </div>
  );
};

export default Color;
