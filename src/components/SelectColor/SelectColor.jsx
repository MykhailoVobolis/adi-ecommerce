import * as RadioGroup from "@radix-ui/react-radio-group";
import RadioInput from "../RadioInput/RadioInput.jsx";
import { nanoid } from "nanoid";
import { Text } from "@radix-ui/themes";
import { useFormik } from "formik";

import css from "./SelectColor.module.css";

export default function SelectColor({ changeColor, productImagesVariants }) {
  const { variants } = productImagesVariants;

  const previewVariants = Object.values(variants).map((variant) => ({
    _id: nanoid(),
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
          {previewVariants.map(({ _id, color, image }) => (
            <RadioInput
              key={_id}
              value={color}
              label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`} // Capitalized
              setFieldValue={formik.setFieldValue}
              handleSubmit={formik.handleSubmit}
              image={image}
            />
          ))}
        </RadioGroup.Root>
      </form>
    </>
  );
}
