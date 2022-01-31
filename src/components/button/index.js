import { Button } from "react-bootstrap";

const Index = ({
  title = "button",
  leftIcon,
  color,
  rounded,
  className,
  ...props
}) => {
  return (
    <Button
      title={title}
      variant={color}
      className={`${className || ""} ${
        rounded ? "tw-rounded-full" : ""
      } tw-font-semibold`}
      {...props}
    >
      <div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
        {leftIcon && <span className="material-icons">{leftIcon}</span>}
        {title && <span className="tw-ml-2">{title}</span>}
      </div>
    </Button>
  );
};

export default Index;
