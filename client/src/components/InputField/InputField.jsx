import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { setCustomerField, setDeliveryAddressField } from '../../redux/checkout/slice.js';
import clsx from 'clsx';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';

import css from './InputField.module.css';

export default function InputField({ name, type = 'text', placeholder, setValue, variant }) {
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

  const handleChange = (value) => {
    setFormValue(name, value, { shouldTouch: true, shouldValidate: true });
    if (name === 'buildingUnit' || name === 'apartmentUnit') {
      dispatch(setDeliveryAddressField({ field: name, value }));
    } else {
      dispatch(setCustomerField({ field: name, value }));
    }
  };

  return (
    <Box mb="3" position="relative">
      {type === 'tel' ? (
        <IMaskInput
          className={clsx(css.inputPhone, {
            [css.inputError]: hasError,
            [css.inputSuccess]: isSuccess,
          })}
          value={fieldValue || ''}
          id={name}
          mask="+{380} 00 000 00 00"
          placeholder={placeholder}
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
          placeholder={placeholder}
          {...register(name)}
          value={fieldValue || ''}
          onChange={(e) => handleChange(e.target.value)}
          type={type}
        />
      )}
      <InputErrorMessage errors={errors} name={name} />
    </Box>
  );
}
