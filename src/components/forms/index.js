import Input from "./input";
import Select from "./select";

export const formInput = ({
  type,
  placeholder,
  disabled,
  input,
  meta,
  label,
  leftIcon,
  rightIcon,
  defaultValue,
  className,
  min,
  max,
  required,
}) => {
  return (
    <div>
      <Input
        {...input}
        label={label}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        isError={meta.touched && meta.error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={className}
        min={min}
        max={max}
        required={required}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-3"></div>
    </div>
  );
};

export const formSelect = ({
  input,
  options,
  disabled,
  placeholder,
  isSearchable,
  isClearable,
  isMulti,
  meta,
  label,
  isLoading,
  value,
  required,
}) => {
  const handleBlur = () => {
    setTimeout(() => {
      input.onBlur(input.value);
    }, 1);
  };
  return (
    <div>
      <Select
        {...input}
        onChange={(value) => input.onChange(value)}
        onBlur={handleBlur}
        options={options}
        placeholder={placeholder}
        label={label}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        isLoading={isLoading}
        isDisabled={disabled}
        isError={meta.touched && meta.error}
        value={value || input.value}
        required={required}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-3"></div>
    </div>
  );
};
