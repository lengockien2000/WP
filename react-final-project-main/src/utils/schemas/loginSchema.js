import * as Yup from 'yup';
import AuthMessage from 'constants/authMessages';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(AuthMessage.EMAIL_REQUIRED)
    .email(AuthMessage.EMAIL_INVALID),
  password: Yup.string()
    .required(AuthMessage.PASSWORD_REQUIRED)
    .min(5, AuthMessage.PASSWORD_LENGTH_SHORT)
    .max(40, AuthMessage.PASSWORD_LENGTH_EXCEED),
});

export default validationSchema;
