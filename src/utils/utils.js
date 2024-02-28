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
};

export const validateRegister = (values) => {
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

export const validateBoatRegister = (values) => {
  const errors = {};

  if (!values.generalInformation) {
    errors.generalInformation = {
      type: 'Required',
      manufacturer: 'Required',
      model: 'Required',
      cityHarbour: {
        postalCode: 'Required',
        city: 'Required'
      }
    };
  } else {
    const generalInfoErrors = {};
    if (!values.generalInformation.type) {
      generalInfoErrors.type = 'Required';
    }
    if (!values.generalInformation.manufacturer) {
      generalInfoErrors.manufacturer = 'Required';
    }
    if (!values.generalInformation.model) {
      generalInfoErrors.model = 'Required';
    }

    if (!values.generalInformation.cityHarbour) {
      generalInfoErrors.cityHarbour = {
        postalCode: 'Required',
        city: 'Required'
      };
    } else {
      const cityHarbourErrors = {};
      if (!values.generalInformation.cityHarbour.postalCode) {
        cityHarbourErrors.postalCode = 'Required';
      }
      if (!values.generalInformation.cityHarbour.city) {
        cityHarbourErrors.city = 'Required';
      }
      if (Object.keys(cityHarbourErrors).length > 0) {
        generalInfoErrors.cityHarbour = cityHarbourErrors;
      }
    }

    if (Object.keys(generalInfoErrors).length > 0) {
      errors.generalInformation = generalInfoErrors;
    }
  }

  if (!values.technicalInformation) {
    errors.technicalInformation = {
      boatLength: 'Required',
      onboardCapacity: 'Required',
      engineType: 'Required',
      enginePower: 'Required'
    };
  } else {
    const techInfoErrors = {};
    if (!values.technicalInformation.boatLength) {
      techInfoErrors.boatLength = 'Required';
    }
    if (!values.technicalInformation.onboardCapacity) {
      techInfoErrors.onboardCapacity = 'Required';
    }
    if (!values.technicalInformation.engineType) {
      techInfoErrors.engineType = 'Required';
    }
    if (!values.technicalInformation.enginePower) {
      techInfoErrors.enginePower = 'Required';
    }

    if (Object.keys(techInfoErrors).length > 0) {
      errors.technicalInformation = techInfoErrors;
    }
  }

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};