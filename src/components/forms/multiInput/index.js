import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { colourStyles } from "../select";

const Input = (props) => (
  <components.Input {...props} onPaste={props.selectProps.onPaste} />
);

const createOption = (label) => ({
  label,
  value: label,
});

const CreatableInputOnly = ({ handleValue, propsValue, label }) => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPaste, setIsPaste] = useState(false);

  const handleChange = (val) => {
    if (val !== null) {
      setValue(val);
    } else {
      setValue([]);
    }
    handleValue(val);
  };

  const handleInputChange = (val) => {
    setInputValue(val);
  };

  const handleKeyDown = (event) => {
    const newAddedValue = createOption(inputValue);
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        inputValue
      );
    if (!inputValue) return;

    switch (event.charCode || event.keyCode) {
      case 9:
      case 13:
      case 32:
        if (isEmail) {
          setInputValue("");
          setValue((value) => [...value, newAddedValue]);

          handleValue([...value, newAddedValue]);
          setIsValidEmail(true);
          event.preventDefault();
        } else {
          setIsValidEmail(false);
        }
        break;
      default:
    }
  };
  const handlePaste = (event) => {
    setIsPaste(true);
    let tempVal = event.clipboardData.getData("Text");
    let isValid = true;
    let tempArr = [];
    tempVal.split(" ").forEach((item) => {
      const newAddedValue = createOption(item);
      const isEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          item
        );
      if (!item) return;
      if (isEmail) {
        tempArr.push(newAddedValue);
      } else {
        isValid = false;
      }
    });
    let flags = {};
    let allValue = [...value, ...tempArr];
    const newValue = allValue.filter(function (entry) {
      if (flags[entry.value]) {
        return false;
      }
      flags[entry.value] = true;
      return true;
    });

    setInputValue("");
    setValue(newValue);

    handleValue(newValue);
    setIsValidEmail(isValid);
    event.preventDefault();
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <CreatableSelect
        components={{ Input }}
        styles={{
          ...colourStyles,
          dropdownIndicator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Insert email"
        value={
          propsValue && Object.keys(propsValue).length > 0 ? propsValue : value
        }
      />
      {!isValidEmail && (
        <span className="form-validation">
          {!isPaste
            ? "Insert email with valid format . Ex: salman@antikode.com"
            : "There is some email that invalid"}
        </span>
      )}
    </div>
  );
};

export default CreatableInputOnly;
