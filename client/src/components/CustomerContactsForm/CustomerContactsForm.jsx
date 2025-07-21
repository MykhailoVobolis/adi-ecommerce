import { Flex } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectCustomer } from '../../redux/checkout/selectors.js';

import InputField from '../InputField/InputField.jsx';

import css from './CustomerContactsForm.module.css';

export default function CustomerContactsForm() {
  const { emailFromAuth } = useSelector(selectCustomer);

  return (
    <>
      <Flex className={css.inputContainer}>
        <InputField name="firstName" placeholder="First Name *" />
        <InputField name="lastName" placeholder="Last Name *" />
      </Flex>
      <Flex className={css.inputContainer}>
        <InputField name="phone" placeholder="Phone Number *" type="tel" />
        {!emailFromAuth && <InputField name="email" placeholder="Email Address *" type="email" />}
      </Flex>
    </>
  );
}
