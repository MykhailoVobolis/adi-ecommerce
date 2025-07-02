import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deliverySchema } from '../../utils/validationSchemas.js';
import { Box, Flex, Text } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

import InputField from '../InputField/InputField.jsx';
import WarehouseSelect from '../WarehouseSelect/WarehouseSelect.jsx';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';

import css from './DeliveryForm.module.css';

export default function DeliveryForm({
  onSubmit,
  warehouses,
  selectedWarehouse,
  totalCount,
  selectedCityName,
  selectedMethod,
}) {
  const methods = useForm({
    resolver: yupResolver(deliverySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!selectedWarehouse) {
      methods.reset({
        warehouseNumber: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      });
      methods.clearErrors();
    }
  }, [selectedMethod, selectedWarehouse, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          name="warehouseNumber"
          control={methods.control}
          defaultValue={selectedWarehouse ? selectedWarehouse.Description : ''}
          render={({ field, fieldState }) => (
            <Box position="relative">
              <WarehouseSelect
                warehouses={warehouses}
                selectedWarehouse={selectedWarehouse}
                totalCount={totalCount}
                selectValue={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                hasError={!!fieldState.error}
                isSuccess={methods.formState.touchedFields['warehouseNumber'] && !fieldState.error}
              />
              <InputErrorMessage errors={methods.formState.errors} name="warehouseNumber" />
            </Box>
          )}
        />
        <Text as="p" mb="6">
          <span className={css.locality}>Locality:</span> {selectedCityName}
        </Text>
        <Flex className={css.inputContainer}>
          <InputField name="firstName" placeholder="First name *" />
          <InputField name="lastName" placeholder="Last name *" />
        </Flex>
        <Flex className={css.inputContainer}>
          <InputField name="phone" placeholder="+380 00 000 00 00 *" type="tel" setValue={methods.setValue} />
          <InputField name="email" placeholder="Email *" type="email" />
        </Flex>

        <button type="submit" className={css.submitBtn} onClick={onSubmit}>
          Continue checkout
          <HiOutlineArrowNarrowRight size={24} />
        </button>
      </form>
    </FormProvider>
  );
}
