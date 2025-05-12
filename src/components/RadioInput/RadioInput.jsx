import * as RadioGroup from "@radix-ui/react-radio-group";
import css from "./RadioInput.module.css";

export default function RadioInput({ value, label, setFieldValue, handleSubmit, image }) {
  const handleClick = () => {
    setFieldValue("color", value);
    handleSubmit();
  };

  const { alt, src } = image;

  return (
    <div className={css.RadioInputContainer}>
      <RadioGroup.Item className={css.RadioGroupItem} value={value} aria-label={label} onClick={handleClick}>
        <img src={`${src}`} alt={`${alt} color`} />
        <RadioGroup.Indicator className={css.RadioGroupIndicator} />
      </RadioGroup.Item>
    </div>
  );
}
