import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { setCustomerField, setDeliveryAddressField } from '../../redux/checkout/slice.js';
import { useState } from 'react';
import clsx from 'clsx';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';
import FloatingLabel from '../FloatingLabel/FloatingLabel.jsx';

import css from './InputField.module.css';

export default function InputField({ name, type = 'text', placeholder, variant }) {
  const {
    register,
    setValue: setFormValue,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext();

  const dispatch = useDispatch();
  const fieldValue = watch(name);

  const hasError = !!errors[name];
  const isSuccess = touchedFields[name] && !hasError;

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value) => {
    setFormValue(name, value, { shouldTouch: true, shouldValidate: true });
    if (name === 'buildingUnit' || name === 'apartmentUnit') {
      dispatch(setDeliveryAddressField({ field: name, value }));
    } else {
      dispatch(setCustomerField({ field: name, value }));
    }
  };

  const showFloatingLabel = isFocused || fieldValue;

  return (
    <Box mb="3" position="relative">
      <FloatingLabel name={name} placeholder={placeholder} showFloatingLabel={showFloatingLabel} />

      {type === 'tel' ? (
        <IMaskInput
          className={clsx(css.inputPhone, {
            [css.inputError]: hasError,
            [css.inputSuccess]: isSuccess,
          })}
          value={fieldValue || ''}
          id={name}
          mask="+{380} 00 000 00 00"
          onFocus={() => setIsFocused(true)}
          {...register(name)}
          onAccept={(value) => handleChange(value)}
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
          {...register(name)}
          value={fieldValue || ''}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => handleChange(e.target.value)}
          type={type}
        />
      )}
      <InputErrorMessage errors={errors} name={name} />
    </Box>
  );
}
