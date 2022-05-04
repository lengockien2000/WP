import * as Yup from 'yup';
import authMessage from 'constants/authMessages';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required(authMessage.USER_NAME_REQUIRED)
    .min(5, authMessage.USER_NAME_LENGTH_SHORT)
    .max(20, authMessage.USER_NAME_LENGTH_EXCEED),
  email: Yup.string()
    .required(authMessage.EMAIL_REQUIRED)
    .email(authMessage.EMAIL_INVALID),
  password: Yup.string()
    .required(authMessage.PASSWORD_REQUIRED)
    .min(5, authMessage.PASSWORD_LENGTH_SHORT)
    .max(40, authMessage.PASSWORD_LENGTH_EXCEED),
  confirmPassword: Yup.string()
    .required(authMessage.CONFIRM_PASSWORD_REQUIRED)
    .min(5, authMessage.PASSWORD_LENGTH_SHORT)
    .max(40, authMessage.PASSWORD_LENGTH_EXCEED)
    .oneOf([Yup.ref('password'), null], authMessage.CONFIRM_PASSWORD_NOT_MATCH),
});

export default validationSchema;
