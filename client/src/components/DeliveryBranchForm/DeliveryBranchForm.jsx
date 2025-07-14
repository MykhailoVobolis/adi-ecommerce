import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { branchDeliverySchema } from '../../utils/validationSchemas.js';
import { Box } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomer } from '../../redux/checkout/selectors.js';

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
  const customer = useSelector(selectCustomer);

  const methods = useForm({
    resolver: yupResolver(branchDeliverySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      warehouseNumber: selectedWarehouse?.Description || '',
    },
  });

  useEffect(() => {
    const shouldReset =
      customer?.firstName || customer?.lastName || customer?.email || customer?.phone || selectedWarehouse;

    if (shouldReset) {
      methods.reset(
        {
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          email: customer.email || '',
          phone: customer.phone || '',
          warehouseNumber: selectedWarehouse?.Description || '',
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepTouched: false,
        },
      );

      const fieldsToTouch = {};
      if (customer.firstName) fieldsToTouch.firstName = true;
      if (customer.lastName) fieldsToTouch.lastName = true;
      if (customer.email) fieldsToTouch.email = true;
      if (customer.phone) fieldsToTouch.phone = true;
      if (selectedWarehouse?.Description) fieldsToTouch.warehouseNumber = true;

      Object.entries(fieldsToTouch).forEach(([field]) => {
        methods.setValue(field, methods.getValues(field), {
          shouldTouch: true,
          shouldValidate: true,
        });
      });
    }
  }, [customer, selectedWarehouse, selectedMethod, methods]);

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
                isSuccess={fieldState.isTouched && !fieldState.error}
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
