import { Flex } from '@radix-ui/themes';

import InputField from '../InputField/InputField.jsx';

import css from './CustomerContactsForm.module.css';

export default function CustomerContactsForm() {
  return (
    <>
      <Flex className={css.inputContainer}>
        <InputField name="firstName" placeholder="First Name *" />
        <InputField name="lastName" placeholder="Last Name *" />
      </Flex>
      <Flex className={css.inputContainer}>
        <InputField name="phone" placeholder="Phone Number *" type="tel" />
        <InputField name="email" placeholder="Email *" type="email" />
      </Flex>
    </>
  );
}
