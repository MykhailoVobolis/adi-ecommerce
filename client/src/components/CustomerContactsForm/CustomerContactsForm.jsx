import { Flex } from '@radix-ui/themes';

import InputField from '../InputField/InputField.jsx';

import css from './CustomerContactsForm.module.css';

export default function CustomerContactsForm({ setValue }) {
  return (
    <>
      <Flex className={css.inputContainer}>
        <InputField name="firstName" placeholder="First name *" />
        <InputField name="lastName" placeholder="Last name *" />
      </Flex>
      <Flex className={css.inputContainer}>
        <InputField name="phone" placeholder="+380 00 000 00 00 *" type="tel" setValue={setValue} />
        <InputField name="email" placeholder="Email *" type="email" />
      </Flex>
    </>
  );
}
