import * as RadioGroup from "@radix-ui/react-radio-group";
import RadioInput from "../RadioInput/RadioInput.jsx";
import { nanoid } from "nanoid";
import { Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

import css from "./SelectColor.module.css";

export default function SelectColor({ changeColor, productImagesVariants }) {
  const { variants } = productImagesVariants;

  const previewVariants = Object.values(variants).map((variant) => ({
    _id: nanoid(),
    color: variant.color,
    image: variant.images[0],
  }));

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      color: "white",
    },
  });

  const handleColorChange = (value) => {
    setValue("color", value);
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    changeColor(data.color);
  };

  const selectedColor = watch("color");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.selectColorForm}>
      <Text as="p" size="3" mt="5" mb="3" weight="bold">
        Colors available
      </Text>
      <RadioGroup.Root
        className={css.RadioGroupRoot}
        value={selectedColor}
        onValueChange={handleColorChange}
        aria-label="Color selection">
        {previewVariants.map(({ _id, color, image }) => (
          <RadioInput
            key={_id}
            value={color}
            label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
            image={image}
            register={register}
          />
        ))}
      </RadioGroup.Root>
    </form>
  );
}
