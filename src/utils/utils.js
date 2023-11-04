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