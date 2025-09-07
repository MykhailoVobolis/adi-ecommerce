import toast from 'react-hot-toast';
import { Flex } from '@radix-ui/themes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordSchema } from '../../utils/validationSchemas.js';
import { changePassword } from '../../redux/auth/operations.js';

import SubmitButton from '../SubmitButton/SubmitButton.jsx';
import InputField from '../InputField/InputField.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

import css from './ChangePasswordForm.module.css';

export default function ChangePasswordForm({ closeModal }) {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const handlePasswordSubmit = (data) => {
    dispatch(changePassword(data))
      .unwrap()
      .then(({ message }) => {
        methods.reset();
        closeModal();
        toast.success(message);
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
      <form onSubmit={methods.handleSubmit(handlePasswordSubmit)}>
        <Flex direction="column" gap="6" mb="6">
          <InputField name="oldPassword" placeholder="Old Password *" type="password" variant="editProfile" />
          <InputField name="newPassword" placeholder="New Password *" type="password" variant="editProfile" />
        </Flex>
        <Flex direction="column" gap="4">
          <SubmitButton label="save changes" />
          <CancelButton handleCancel={handleCancel} />
        </Flex>
      </form>
    </FormProvider>
  );
}
