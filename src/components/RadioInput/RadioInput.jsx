import * as RadioGroup from "@radix-ui/react-radio-group";
import css from "./RadioInput.module.css";

export default function RadioInput({ value, lable }) {
  return (
    <div className={css.RadioInputContainer}>
      <RadioGroup.Item className={css.RadioGroupItem} value={value} aria-label={lable}>
        <RadioGroup.Indicator className={css.RadioGroupIndicator} />
      </RadioGroup.Item>
    </div>
  );
}
