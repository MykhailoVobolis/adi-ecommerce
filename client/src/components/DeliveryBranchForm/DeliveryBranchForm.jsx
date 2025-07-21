import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { branchDeliverySchema } from '../../utils/validationSchemas.js';
import { Box } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomer } from '../../redux/checkout/selectors.js';

import WarehouseSelect from '../WarehouseSelect/WarehouseSelect.jsx';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';
import InfoRow from '../InfoRow/InfoRow.jsx';
import CustomerContactsForm from '../CustomerContactsForm/CustomerContactsForm.jsx';
import SubmitButton from '../SubmitButton/SubmitButton.jsx';

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
  const { email, emailFromAuth } = customer;
  const { selectedBranch, selectedPostomat } = selectedWarehouse;

  const isBranch = selectedMethod === 'branch';

  const methods = useForm({
    resolver: yupResolver(branchDeliverySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      warehouseNumber: isBranch ? selectedBranch?.Description || '' : selectedPostomat?.Description || '',
    },
  });

  useEffect(() => {
    const shouldReset =
      customer?.firstName ||
      customer?.lastName ||
      customer?.email ||
      customer?.phone ||
      selectedBranch ||
      selectedPostomat;

    if (shouldReset) {
      methods.reset(
        {
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          email: customer.email || '',
          phone: customer.phone || '',
          warehouseNumber: isBranch ? selectedBranch?.Description || '' : selectedPostomat?.Description || '',
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepTouched: false,
        },
      );

      const fieldsToTouch = {
        ...(customer.firstName && { firstName: true }),
        ...(customer.lastName && { lastName: true }),
        ...(customer.email && { email: true }),
        ...(customer.phone && { phone: true }),
        ...((selectedBranch?.Description || selectedPostomat?.Description) && { warehouseNumber: true }),
      };

      Object.entries(fieldsToTouch).forEach(([field]) => {
        methods.setValue(field, methods.getValues(field), {
          shouldTouch: true,
          shouldValidate: true,
        });
      });
    }
  }, [customer, selectedBranch, selectedPostomat, selectedMethod, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          name="warehouseNumber"
          control={methods.control}
          defaultValue={isBranch ? selectedBranch?.Description || '' : selectedPostomat?.Description || ''}
          render={({ field, fieldState }) => (
            <Box position="relative">
              <WarehouseSelect
                warehouses={warehouses}
                selectedBranch={selectedBranch}
                selectedPostomat={selectedPostomat}
                isBranch={isBranch}
                totalCount={totalCount}
                selectValue={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                hasError={!!fieldState.error}
                isSuccess={fieldState.isTouched && !fieldState.error}
                selectedMethod={selectedMethod}
              />
              <InputErrorMessage errors={methods.formState.errors} name="warehouseNumber" />
            </Box>
          )}
        />
        <InfoRow label="Locality" value={selectedCityName} />
        <CustomerContactsForm />
        {emailFromAuth && <InfoRow label="Email" value={email} />}
        <SubmitButton />
      </form>
    </FormProvider>
  );
}
