export const getErrorMessage = (error) => {
    let errorMessage = "Unknown error occurred";

    if (typeof error === "string") {
        errorMessage = error;
    } else if (error && error.message) {
        errorMessage = error.message;
    } else if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        errorMessage = error.errors[0].msg;
    }

    return { message: errorMessage };
}

export const validateRegister = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    return errors;
  };

  export const validateBoatRegister = values => {
    const errors = {};
    const validSkipperOptions = ['Yes', 'No', 'Both'];
  
    if (!values.type) {
      errors.type = 'Required';
    }
  
    if (!values.manufacturer) {
      errors.manufacturer = 'Required';
    }
  
    if (!values.model) {
      errors.model = 'Required';
    }
  
    if (!values.cityHarbour) {
      errors.cityHarbour = 'Required';
    }
  
    if (!values.skipperOption || !validSkipperOptions.includes(values.skipperOption)) {
      errors.skipperOption = 'Invalid skipper option';
    }
  
    if (!values.capacity) {
      errors.capacity = 'Required';
    }
  
    if (!values.length) {
      errors.length = 'Required';
    }
  
    errors.engine = {};
    if (!values.engine) {
      errors.engine.type = 'Engine details are required';
      errors.engine.power = 'Engine details are required';
    } else {
      if (!values.engine.type) {
        errors.engine.type = 'Required';
      }
  
      if (!values.engine.power) {
        errors.engine.power = 'Required';
      }
    }
  
    if (Object.keys(errors.engine).length === 0) {
      delete errors.engine;
    }
  
    return errors;
  };

  export const validateBoatEdit = values => {
    const errors = {};
    const validSkipperOptions = ['Yes', 'No', 'Both'];
  
    if (!values.type) {
      errors.type = 'Required';
    }
  
    if (!values.manufacturer) {
      errors.manufacturer = 'Required';
    }
  
    if (!values.model) {
      errors.model = 'Required';
    }
  
    if (!values.cityHarbour) {
      errors.cityHarbour = 'Required';
    }
  
    if (!values.skipperOption || !validSkipperOptions.includes(values.skipperOption)) {
      errors.skipperOption = 'Invalid skipper option';
    }
  
    if (!values.capacity) {
      errors.capacity = 'Required';
    }
  
    if (!values.length) {
      errors.length = 'Required';
    }
  
    errors.engine = {};
    if (!values.engine) {
      errors.engine.type = 'Engine details are required';
      errors.engine.power = 'Engine details are required';
    } else {
      if (!values.engine.type) {
        errors.engine.type = 'Required';
      }
  
      if (!values.engine.power) {
        errors.engine.power = 'Required';
      }
    }
  
    if (Object.keys(errors.engine).length === 0) {
      delete errors.engine;
    }
  
    return errors;
  };
  
  export const validateLogin = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };