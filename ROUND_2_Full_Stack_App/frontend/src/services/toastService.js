import React from 'react';
import { Toast, POSITION } from 'react-toastify';

export const showToast = (message, type = 'success') => {
  const toast = require('react-toastify').toast;
  toast[type](message, {
    position: POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};
