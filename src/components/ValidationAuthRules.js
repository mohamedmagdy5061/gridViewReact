
export default function ValidationAuthRules(values) {

    const errors = {};
    
    if (!values.email) {
      errors.email = 'input is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    } else {
        errors.email = 'valid'
    }

    if (!values.firstName) {
        errors.firstName = 'input is required';
    } else {
        errors.firstName = 'valid'
    }

    if (!values.lastName) {
        errors.lastName = 'input is required';
    } else {
        errors.lastName = 'valid'
    }

    if (!values.city) {
        errors.city = 'input is required';
    } else {
        errors.city = 'valid'
    }

    return errors;

}
