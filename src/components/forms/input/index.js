import React from "react";

const Input = ({
  type,
  placeholder,
  disabled,
  value,
  onChange,
  style,
  className,
  label,
  leftIcon,
  rightIcon,
  isError,
  defaultValue,
  required,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="tw-text-red-600">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {leftIcon && (
          <span className="material-icons-round left-icon-input">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`form-control ${className || ""} ${
            rightIcon ? "end-icon" : ""
          } ${isError ? "is-invalid" : ""}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          style={style}
          {...props}
        />
        {rightIcon && (
          <span className={`material-icons-round right-icon-input`}>
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
