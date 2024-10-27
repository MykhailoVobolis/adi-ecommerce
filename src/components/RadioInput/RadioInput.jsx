import * as RadioGroup from "@radix-ui/react-radio-group";
import css from "./RadioInput.module.css";

export default function RadioInput({ value, lable, setFieldValue, handleSubmit }) {
  const handleClick = () => {
    setFieldValue("color", value);
    handleSubmit();
  };

  return (
    <div className={css.RadioInputContainer}>
      <RadioGroup.Item className={css.RadioGroupItem} value={value} aria-label={lable} onClick={handleClick}>
        <RadioGroup.Indicator className={css.RadioGroupIndicator} />
      </RadioGroup.Item>
    </div>
  );
}
