import { useSelector } from 'react-redux';
import { selectCustomer } from '../../redux/checkout/selectors.js';

import InputField from '../InputField/InputField.jsx';

import css from './CustomerContactsForm.module.css';

export default function CustomerContactsForm() {
  const { emailFromAuth } = useSelector(selectCustomer);

  return (
    <>
      <div className={css.inputContainer}>
        <div className={css.field}>
          <InputField name="firstName" placeholder="First Name *" />
        </div>
        <div className={css.field}>
          <InputField name="lastName" placeholder="Last Name *" />
        </div>
      </div>
      <div className={css.inputContainer}>
        <div className={css.field}>
          <InputField name="phone" placeholder="Phone Number *" type="tel" />
        </div>
        {!emailFromAuth && (
          <div className={css.field}>
            <InputField name="email" placeholder="Email Address *" type="email" />
          </div>
        )}
      </div>
    </>
  );
}
