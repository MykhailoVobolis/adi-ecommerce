import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@radix-ui/themes';
import { useMemo } from 'react';
import { authSchema } from '../../utils/validationSchemas.js';
import { useDispatch } from 'react-redux';
import { checkEmail, logIn, register } from '../../redux/auth/operations.js';
import { clearEmailAvailable } from '../../redux/auth/slice.js';

import InputField from '../InputField/InputField.jsx';
import SubmitButton from '../SubmitButton/SubmitButton.jsx';

import css from './AuthForm.module.css';

export default function AuthForm({ emailAvailable }) {
  const dispatch = useDispatch();

  const validationSchema = useMemo(() => authSchema(emailAvailable), [emailAvailable]);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const handleEmailSubmit = async ({ email }) => {
    dispatch(checkEmail(email))
      .unwrap()
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handlePasswordSubmit = async (userData) => {
    dispatch(emailAvailable ? register(userData) : logIn(userData))
      .unwrap()
      .then(() => {
        dispatch(clearEmailAvailable());
        // dispatch(getUserCart());
        methods.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={css.form}
        onSubmit={handleSubmit(emailAvailable === null ? handleEmailSubmit : handlePasswordSubmit)}
      >
        {emailAvailable === null && (
          <Box mb="7">
            <InputField name="email" placeholder="Email Address *" type="email" variant="auth" />
          </Box>
        )}
        {emailAvailable !== null && (
          <Box mb="7">
            <InputField name="password" placeholder="Password *" type="password" variant="auth" />
          </Box>
        )}
        <SubmitButton
          label={emailAvailable === null ? 'CONTINUE' : emailAvailable ? 'CREATE PASSWORD' : 'SIGN IN'}
          variant="auth"
        />
      </form>
    </FormProvider>
  );
}
