import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { branchDeliverySchema } from '../../utils/validationSchemas.js';
import { Box } from '@radix-ui/themes';
import { useEffect } from 'react';

import WarehouseSelect from '../WarehouseSelect/WarehouseSelect.jsx';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';
import LocalityInfo from '../LocalityInfo/LocalityInfo.jsx';
import CustomerContactsForm from '../CustomerContactsForm/CustomerContactsForm.jsx';
import SubmitDeliveryButton from '../SubmitDeliveryButton/SubmitDeliveryButton.jsx';

import css from './DeliveryBranchForm.module.css';

export default function DeliveryBranchForm({
  onSubmit,
  warehouses,
  selectedWarehouse,
  totalCount,
  selectedCityName,
  selectedMethod,
}) {
  const methods = useForm({
    resolver: yupResolver(branchDeliverySchema),
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
        <LocalityInfo cityName={selectedCityName} />
        <CustomerContactsForm setValue={methods.setValue} />
        <SubmitDeliveryButton />
      </form>
    </FormProvider>
  );
}
