import * as RadioGroup from "@radix-ui/react-radio-group";
import { Text } from "@radix-ui/themes";
import RadioInput from "../RadioInput/RadioInput.jsx";
import { useFormik } from "formik";

import css from "./SelectColor.module.css";

export default function SelectColor({ changeColor, productImagesVariants }) {
  const { variants } = productImagesVariants;

  const previewVariants = Object.values(variants).map((variant) => ({
    color: variant.color,
    image: variant.images[0],
  }));

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
          {previewVariants.map((variant, index) => (
            <RadioInput
              key={index}
              value={variant.color}
              label={`${variant.color.charAt(0).toUpperCase()}${variant.color.slice(1)}`} // Capitalized
              setFieldValue={formik.setFieldValue}
              handleSubmit={formik.handleSubmit}
              image={variant.image}
            />
          ))}
        </RadioGroup.Root>
      </form>
    </>
  );
}
