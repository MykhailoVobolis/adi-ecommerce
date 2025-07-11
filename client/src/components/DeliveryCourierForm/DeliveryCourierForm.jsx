import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { courierDeliverySchema } from '../../utils/validationSchemas.js';
import { Box, Flex } from '@radix-ui/themes';
import { useEffect } from 'react';

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
  const methods = useForm({
    resolver: yupResolver(courierDeliverySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!selectedStreet) {
      methods.reset({
        streetName: '',
        buildingUnit: '',
        apartmentUnit: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      });
      methods.clearErrors();
    }
  }, [selectedMethod, selectedStreet, methods]);

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
                isSuccess={methods.formState.touchedFields['streetName'] && !fieldState.error}
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
