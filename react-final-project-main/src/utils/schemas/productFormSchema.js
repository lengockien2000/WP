import * as Yup from 'yup';
import ProductMessage from 'constants/productMessage';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(ProductMessage.TITLE_REQUIRED)
    .min(5, ProductMessage.TITLE_LENGTH_SHORT)
    .max(30, ProductMessage.TITLE_LENGTH_EXCEED),
  imageUrl: Yup.string()
    .required(ProductMessage.IMAGE_URL_REQUIRED)
    .url(ProductMessage.IMAGE_URL_INVALID)
    .matches(
      /^https?:\/\/.*\.(?:png|jpg)$/,
      ProductMessage.IMAGE_URL_NOT_RIGHT_FORMAT,
    ),
  price: Yup.number()
    .typeError(ProductMessage.PRICE_INVALID)
    .min(0, ProductMessage.PRICE_NOT_NEGATIVE)
    .required(ProductMessage.PRICE_REQUIRED),
});

export default validationSchema;
