/* eslint-disable import/prefer-default-export */
export const formatVnd = (n) =>
  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
