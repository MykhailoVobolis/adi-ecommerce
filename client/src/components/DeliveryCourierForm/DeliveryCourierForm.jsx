import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { courierDeliverySchema } from '../../utils/validationSchemas.js';
import { Box, Flex } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomer, selectDeliveryAddress } from '../../redux/checkout/selectors.js';

import InputErrorMessage from '../InputErrorMessage/InputErrorMessage.jsx';
import LocalityInfo from '../LocalityInfo/LocalityInfo.jsx';
import CustomerContactsForm from '../CustomerContactsForm/CustomerContactsForm.jsx';
import SubmitDeliveryButton from '../SubmitDeliveryButton/SubmitDeliveryButton.jsx';
import InputField from '../InputField/InputField.jsx';
import StreetSelect from '../StreetSelect/StreetSelect.jsx';

import css from './DeliveryCourierForm.module.css';

export default function DeliveryCourierForm({
  onSubmit,
  streets,
  selectedStreet,
  totalCount,
  selectedCityName,
  selectedMethod,
}) {
  const customer = useSelector(selectCustomer);
  const { buildingUnit: selectedBuildingUnit, apartmentUnit: selectedApartmentUnit } =
    useSelector(selectDeliveryAddress);

  const methods = useForm({
    resolver: yupResolver(courierDeliverySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      streetName: selectedStreet?.Description || '',
      buildingUnit: selectedBuildingUnit || '',
      apartmentUnit: selectedApartmentUnit || '',
    },
  });

  useEffect(() => {
    const hasCustomer = customer?.firstName || customer?.lastName || customer?.email || customer?.phone;

    const values = {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      streetName: selectedStreet?.Description || '',
      buildingUnit: selectedBuildingUnit || '',
      apartmentUnit: selectedApartmentUnit || '',
    };

    // Коли selectedStreet очищено або змінився метод доставки — скидати форму
    if (!selectedStreet && !hasCustomer) {
      methods.reset(values);
      methods.clearErrors();
      return;
    }

    // Під час повернення або оновлення — проставити дані і торкнутись полів
    methods.reset(values, {
      keepErrors: true,
      keepDirty: true,
      keepTouched: false,
    });

    Object.entries(values).forEach(([field, value]) => {
      if (value) {
        methods.setValue(field, value, {
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    });
  }, [customer, selectedStreet, selectedMethod, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          name="streetName"
          control={methods.control}
          defaultValue={selectedStreet ? selectedStreet.Description : ''}
          render={({ field, fieldState }) => (
            <Box position="relative">
              <StreetSelect
                streets={streets}
                selectedStreet={selectedStreet}
                totalCount={totalCount}
                onChange={field.onChange}
                onBlur={field.onBlur}
                hasError={!!fieldState.error}
                isSuccess={fieldState.isTouched && !fieldState.error}
              />
              <InputErrorMessage errors={methods.formState.errors} name="streetName" />
            </Box>
          )}
        />
        <Flex className={css.inputContainer}>
          <InputField name="buildingUnit" placeholder="Building/Unit *" />
          <InputField name="apartmentUnit" placeholder="Apartment/Unit (optional)" />
        </Flex>
        <LocalityInfo cityName={selectedCityName} />
        <CustomerContactsForm setValue={methods.setValue} />
        <SubmitDeliveryButton />
      </form>
    </FormProvider>
  );
}
