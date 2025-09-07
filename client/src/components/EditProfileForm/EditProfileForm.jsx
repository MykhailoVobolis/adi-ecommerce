import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileSchema } from '../../utils/validationSchemas.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { Flex, Text } from '@radix-ui/themes';
import { updateUser } from '../../redux/auth/operations.js';

import SubmitButton from '../SubmitButton/SubmitButton.jsx';
import InputField from '../InputField/InputField.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

import css from './EditProfileForm.module.css';

export default function EditProfileForm({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const methods = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    },
  });

  useEffect(() => {
    const shouldReset = user?.firstName || user?.lastName || user?.phone;

    if (shouldReset) {
      methods.reset(
        {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepTouched: false,
        },
      );

      const fieldsToTouch = {
        ...(user.firstName && { firstName: true }),
        ...(user.lastName && { lastName: true }),
        ...(user.phone && { phone: true }),
      };

      Object.entries(fieldsToTouch).forEach(([field]) => {
        methods.setValue(field, methods.getValues(field), {
          shouldTouch: true,
          shouldValidate: true,
        });
      });
    }
  }, [user, methods]);

  const handleProfileSubmit = (data) => {
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        methods.reset();
        closeModal();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCancel = () => {
    methods.reset();
    closeModal();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleProfileSubmit)}>
        <Flex direction="column" gap="7" mb="7">
          <InputField name="firstName" placeholder="First Name *" variant="editProfile" />
          <InputField name="lastName" placeholder="Last Name *" variant="editProfile" />
        </Flex>
        <Flex direction="column" mb="6">
          <Text className={css.userDetails} as="p" mb="4" size="5" weight="bold">
            MOBILE PHONE
          </Text>
          <InputField name="phone" placeholder="Phone Number *" type="tel" variant="editProfile" />
        </Flex>
        <Flex direction="column" gap="4">
          <SubmitButton label="update details" variant="editProfile" />
          <CancelButton handleCancel={handleCancel} variant="editProfile" />
        </Flex>
      </form>
    </FormProvider>
  );
}
