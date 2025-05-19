import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

import css from "./RadioInput.module.css";

export default function RadioInput({ value, label, children, className, indicatorClassName }) {
  return (
    <RadioGroup.Item value={value} aria-label={label} className={clsx(css.RadioGroupItem, className)}>
      {children}
      <RadioGroup.Indicator className={clsx(css.RadioGroupIndicator, indicatorClassName)} />
    </RadioGroup.Item>
  );
}
