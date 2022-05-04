const ProductMessage = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_LENGTH_SHORT: 'Title must be at least 5 characters',
  TITLE_LENGTH_EXCEED: 'Title must not exceed 30 characters',

  IMAGE_URL_REQUIRED: 'Image is required',
  IMAGE_URL_INVALID: 'Image url is invalid',
  IMAGE_URL_NOT_RIGHT_FORMAT:
    'Your image url should be either in .jpg or .png format',

  PRICE_REQUIRED: 'Price is required',
  PRICE_INVALID: 'Price is needed to be a number',
  PRICE_NOT_NEGATIVE: 'Price must be a positive number',
};

export default ProductMessage;
