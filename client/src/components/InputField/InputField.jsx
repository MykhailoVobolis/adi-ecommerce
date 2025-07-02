import { useFormContext } from 'react-hook-form';
import { Box, Text, TextField } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';

import css from './InputField.module.css';

export default function InputField({ name, type = 'text', placeholder, setValue, variant }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box mb="3" position="relative">
      {type === 'tel' ? (
        <IMaskInput
          className={css.inputPhone}
          id={name}
          mask="+{380} 00 000 00 00"
          placeholder={placeholder}
          {...register(name)}
          onAccept={(value) => setValue && setValue(name, value)}
        />
      ) : (
        <TextField.Root
          id={name}
          className={css.textField}
          size="3"
          variant={variant || 'surface'}
          placeholder={placeholder}
          {...register(name)}
          type={type}
        />
      )}
      <InputErrorMessage errors={errors} name={name} />
    </Box>
  );
}
