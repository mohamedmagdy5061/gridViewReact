import { useState } from 'react'


export default function CustomFormReact(initialState, validate) {
        
    const [inputValue, setInputValue] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name] : event.target.value
        })
    }

    const handleBlur = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name] : event.target.value
        })
        const validationErrors = validate(inputValue)
        setErrors(validationErrors)
    }

    return { handleChange, handleBlur, inputValue, errors}
}
