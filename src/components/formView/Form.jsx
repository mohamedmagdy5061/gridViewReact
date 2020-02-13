import React from 'react';
// import CustomFormReact from './CustomFormReact';
// import validation from './ValidationAuthRules';
// import ErrorMessage from './ErrorMessage';
import Input from './Input';

export const Form = () => {
    
//   const initial_State = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     city: ''
//   };

//   const { handleBlur, handleChange, inputValue, errors } = CustomFormReact(
//     initial_State,
//     validation
//   );

//   console.log(errors, 'errors>>>>>>');

  return (
    <div>
      <div className="field-group">
        <Input
          type="text"
          placeholder="Please input"
          name="firstName"
          labelName='First Name'
        />
         <Input
          type="text"
          placeholder="Please input"
          name="lastName"
          labelName='Last Name'
        />

        <Input
          type="text"
          placeholder="Please input"
          name="email"
          labelName='Email'
        />



        {/* <Input
          type="text"
          placeholder="Please input"
          name="email"
          labelName='Email'
        /> */}
        {/* <label className="lab" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Please input"
          name="lastName"
          className={`${errors.lastName && 'errorInput'} ${errors.lastName &&
            errors.lastName === 'valid' &&
            'validInput'} btn`}
          value={inputValue.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && (
          <ErrorMessage errors={errors} inputName={'lastName'} />
        )}
        <label className="lab" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Please input"
          name="email"
          className={`${errors.email && 'errorInput'} ${errors.email &&
            errors.email === 'valid' &&
            'validInput'} btn`}
          value={inputValue.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <ErrorMessage errors={errors} inputName={'email'} />}
        <label className="lab" htmlFor="city">
          City
        </label>
        <select
          type="text"
          id="city"
          name="city"
          className={`${errors.city && 'errorInput'} ${errors.city &&
            errors.city === 'valid' &&
            'validInput'} btn`}
          value={inputValue.city}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Please input</option>
          <option value="alx">Alx</option>
          <option value="cairo">cairo</option>
          <option value="mansoura">Mansoura</option>
        </select>
        {errors.city && <ErrorMessage errors={errors} inputName={'city'} />} */}
      </div>
    </div>
  );
};

export default Form;
