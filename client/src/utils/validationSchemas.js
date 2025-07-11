import * as yup from 'yup';

const regex = {
  emailRegexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phoneNumberRegexp: /^\+380\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
};

export const branchDeliverySchema = yup.object().shape({
  warehouseNumber: yup.string().required('Please enter the address or branch number'),
  firstName: yup.string().required('Enter your first name').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Enter your last name').min(2, 'Last name must be at least 2 characters'),
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(regex.phoneNumberRegexp, 'Number format: +380 00 000 00 00'),
  email: yup
    .string()
    .required('Please enter your email address')
    .matches(regex.emailRegexp, 'Invalid email address. Example: user@mail.com'),
});

export const courierDeliverySchema = yup.object().shape({
  streetName: yup.string().required('Please enter the street name'),
  buildingUnit: yup.string().required('Please enter building/unit info'),
  apartmentUnit: yup.string(),
  firstName: yup.string().required('Enter your first name').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Enter your last name').min(2, 'Last name must be at least 2 characters'),
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(regex.phoneNumberRegexp, 'Number format: +380 00 000 00 00'),
  email: yup
    .string()
    .required('Please enter your email address')
    .matches(regex.emailRegexp, 'Invalid email address. Example: user@mail.com'),
});
