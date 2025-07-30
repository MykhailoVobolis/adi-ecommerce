import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editEmailSchema } from '../../utils/validationSchemas.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { Flex } from '@radix-ui/themes';
import { updateUser } from '../../redux/auth/operations.js';

import SubmitButton from '../SubmitButton/SubmitButton.jsx';
import InputField from '../InputField/InputField.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

import css from './EditEmailForm.module.css';

export default function EditEmailForm({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const methods = useForm({
    resolver: yupResolver(editEmailSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: user?.email || '',
    },
  });

  useEffect(() => {
    const shouldReset = user?.email;

    if (shouldReset) {
      methods.reset(
        {
          email: user?.email || '',
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepTouched: false,
        },
      );

      const fieldsToTouch = {
        ...(user.email && { email: true }),
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
        <Flex direction="column" mb="6">
          <InputField name="email" placeholder="Email Address *" type="email" variant="editProfile" />
        </Flex>
        <Flex direction="column" gap="4">
          <SubmitButton label="save changes" />
          <CancelButton handleCancel={handleCancel} />
        </Flex>
      </form>
    </FormProvider>
  );
}
