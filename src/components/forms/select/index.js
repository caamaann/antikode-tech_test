import React from "react";
import { bool } from "prop-types";
import Select from "react-select";
import Color from "../../../assets/styles/_variables.module.scss";

const { primary, danger, inactive } = Color;
export const colourStyles = {
  control: (style, state) => {
    let isError = state.selectProps.isError;
    return {
      ...style,
      backgroundColor: state.isDisabled
        ? inactive
        : isError
        ? "#fff6f7"
        : "#FFF",
      color: state.isDisabled ? "#b8b8d6" : state.hasValue ? "#222d17" : "",
      borderRadius: 4,
      borderColor: isError
        ? danger
        : state.isFocused
        ? primary
        : state.hasValue
        ? primary
        : "#ced4da",
      "&:hover": {
        borderColor: isError
          ? danger
          : state.isFocused
          ? primary
          : state.hasValue
          ? primary
          : "#ced4da",
      },
      boxShadow: state.isFocused
        ? `0 0 0 0.25rem rgba(4, 170, 89, 0.25);`
        : null,
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: 14,
      width: "100%",
      height: "100%",
    };
  },
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    fontFamily: `"Open Sans", sans-serif`,
    fontSize: 14,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  input: (styles) => {
    return {
      ...styles,
      fontFamily: `"Open Sans", sans-serif`,
      "& input": {
        font: "inherit",
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    fontFamily: `"Open Sans", sans-serif`,
    fontSize: 14,
    color: "#495057",
    opacity: 0.68,
  }),
  singleValue: (styles) => ({
    ...styles,
    fontFamily: `"Open Sans", sans-serif`,
    fontSize: 14,
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#CCD1E4",
      borderRadius: "0.5rem",
      // height: 30,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    fontFamily: `"Open Sans", sans-serif`,
    fontSize: 14,
    textAlign: "center",
    padding: "0.25rem 0.5rem",
    // color: "white",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#119E74",
  }),
};

const SelectComponent = (props) => {
  const {
    isClearable,
    label,
    // placeholder,
  } = props;

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <Select
        isClearable={isClearable}
        styles={{ ...colourStyles }}
        {...props}
      />
    </div>
  );
};

SelectComponent.propsTypes = {
  isClearable: bool,
};
SelectComponent.defaultProps = {
  isClearable: true,
};

export default SelectComponent;
