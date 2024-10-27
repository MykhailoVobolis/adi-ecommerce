import * as RadioGroup from "@radix-ui/react-radio-group";
import { Text } from "@radix-ui/themes";
import RadioInput from "../RadioInput/RadioInput.jsx";
import { useFormik } from "formik";

import css from "./SelectColor.module.css";

export default function SelectColor({ changeColor }) {
  const formik = useFormik({
    initialValues: {
      color: "white",
    },
    onSubmit: (values) => {
      changeColor(values.color);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.selectColorForm}>
        <Text as="p" size="3" mt="5" mb="3" weight="bold">
          Colors available
        </Text>
        <RadioGroup.Root className={css.RadioGroupRoot} defaultValue="white" aria-label="View density">
          <RadioInput
            value={"white"}
            lable={"White"}
            setFieldValue={formik.setFieldValue}
            handleSubmit={formik.handleSubmit}
          />
          <RadioInput
            value={"blue"}
            lable={"Blue"}
            setFieldValue={formik.setFieldValue}
            handleSubmit={formik.handleSubmit}
          />
          <RadioInput
            value={"green"}
            lable={"Green"}
            setFieldValue={formik.setFieldValue}
            handleSubmit={formik.handleSubmit}
          />
        </RadioGroup.Root>
      </form>
    </>
  );
}
