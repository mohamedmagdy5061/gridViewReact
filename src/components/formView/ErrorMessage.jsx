// import React from 'react';

const ErrorMessage = ({ errors, inputName }) => (
  <p className="errorMessage">
    {errors[inputName] !== 'valid' && errors[inputName]}{' '}
  </p>
);

export default ErrorMessage;
