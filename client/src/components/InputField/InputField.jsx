import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';
import clsx from 'clsx';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';

import css from './InputField.module.css';

export default function InputField({ name, type = 'text', placeholder, setValue, variant }) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  const hasError = !!errors[name];
  const isSuccess = touchedFields[name] && !hasError;

  return (
    <Box mb="3" position="relative">
      {type === 'tel' ? (
        <IMaskInput
          className={clsx(css.inputPhone, {
            [css.inputError]: hasError,
            [css.inputSuccess]: isSuccess,
          })}
          id={name}
          mask="+{380} 00 000 00 00"
          placeholder={placeholder}
          {...register(name)}
          onAccept={(value) => setValue && setValue(name, value)}
        />
      ) : (
        <TextField.Root
          className={clsx(css.textField, {
            [css.inputError]: hasError,
            [css.inputSuccess]: isSuccess,
          })}
          id={name}
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
