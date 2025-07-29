import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { setCustomerField, setDeliveryAddressField } from '../../redux/checkout/slice.js';
import { useState } from 'react';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';
import FloatingLabel from '../FloatingLabel/FloatingLabel.jsx';
import PasswordVisibilityButton from '../PasswordVisibilityButton/PasswordVisibilityButton.jsx';

import css from './InputField.module.css';

export default function InputField({ name, type = 'text', placeholder, variant }) {
  const {
    register,
    setValue: setFormValue,
    formState: { errors, touchedFields },
    watch,
    trigger,
  } = useFormContext();

  const dispatch = useDispatch();
  const fieldValue = watch(name);

  const hasError = !!errors[name];
  const isSuccess = touchedFields[name] && !hasError;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (value) => {
    setFormValue(name, value, { shouldTouch: true, shouldValidate: true });

    if (variant === 'auth') return;

    if (name === 'buildingUnit' || name === 'apartmentUnit') {
      dispatch(setDeliveryAddressField({ field: name, value }));
    } else {
      dispatch(setCustomerField({ field: name, value }));
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    trigger(name); // запуск валідації вручную на блюр
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
            [css.authInput]: variant === 'auth',
            [css.editProfileInput]: variant === 'editProfile',
          })}
          value={fieldValue || ''}
          id={name}
          mask="+{380} 00 000 00 00"
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          {...register(name)}
          onAccept={(value) => handleChange(value)}
        />
      ) : (
        <TextField.Root
          className={clsx(css.textField, {
            [css.inputError]: hasError,
            [css.inputSuccess]: isSuccess,
            [css.authInput]: variant === 'auth',
            [css.editProfileInput]: variant === 'editProfile',
          })}
          id={name}
          size="3"
          variant={variant || 'surface'}
          {...register(name)}
          value={fieldValue || ''}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => handleChange(e.target.value)}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
        />
      )}
      <InputErrorMessage errors={errors} name={name} />
      {name === 'password' && <PasswordVisibilityButton onClick={handleClick} visible={isPasswordVisible} />}
    </Box>
  );
}
