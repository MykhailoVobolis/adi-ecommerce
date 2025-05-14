import * as RadioGroup from "@radix-ui/react-radio-group";
import css from "./RadioInput.module.css";

export default function RadioInput({ value, label, image }) {
  const { alt, src } = image;

  return (
    <div className={css.RadioInputContainer}>
      <RadioGroup.Item className={css.RadioGroupItem} value={value} aria-label={label}>
        <img src={src} alt={`${alt || label} color`} />
        <RadioGroup.Indicator className={css.RadioGroupIndicator} />
      </RadioGroup.Item>
    </div>
  );
}
