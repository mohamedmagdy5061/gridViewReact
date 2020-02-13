import React from 'react';
import  CustomFormReact  from './CustomFormReact';
import validation from '../ValidationAuthRules';
import ErrorMessage from './ErrorMessage'



export const Input = ({name, placeholder, type, labelName}) => {

    const { handleBlur, handleChange, errors } = CustomFormReact(undefined,
    validation
  );

    return (
        <div>
            <div className="field-group">
                <label className="lab" htmlFor={name}>{labelName}</label>
                <input  
                    type={type} id={name} 
                    placeholder={placeholder}
                    name={name} 
                    className={`${errors[name] && 'errorInput'} ${errors[name] && errors[name] === 'valid' && 'validInput' } btn`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
               {errors[name] &&  <ErrorMessage errors={errors} inputName={name}/>}
            </div>
        </div>
    )
}


export default Input;