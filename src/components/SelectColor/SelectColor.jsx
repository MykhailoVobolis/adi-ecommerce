import * as RadioGroup from "@radix-ui/react-radio-group";
import { Text } from "@radix-ui/themes";
import RadioInput from "../RadioInput/RadioInput.jsx";

import css from "./SelectColor.module.css";

export default function SelectColor() {
  return (
    <>
      <form className={css.selectColorForm}>
        <Text as="p" size="3" mt="5" mb="3" weight="bold">
          Colors available
        </Text>
        <RadioGroup.Root className={css.RadioGroupRoot} defaultValue="white" aria-label="View density">
          <RadioInput value={"white"} lable={"White"} />
          <RadioInput value={"blue"} lable={"Blue"} />
          <RadioInput value={"green"} lable={"Green"} />
        </RadioGroup.Root>
      </form>
    </>
  );
}
