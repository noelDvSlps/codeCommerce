import validator from "validator";

export const ValidateEmail = (input) => {
  
  if (validator.isEmail(input)) {
    return ""
  } else {
   
    return "Invalid Email"
  }
};

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return "Alphabetical letters only";
    }
  } else {
    return undefined;
  }
};

export const passwordValidation = (value) => {
  if (value) {
    if ((/^[a-zA-Z 0-9-!@#$%^&*()_+]*$/i.test(value)) && value.length > 7 && value.length < 21) {
      return undefined;
    } else {
      return "Invalid Password";
    }
  } else {
    return undefined;
  }
};

export const confirmPasswordValidation = (value, password) => {
  if (value === password) {
    return undefined;
  } else {
    return "Password does not match";
  }
};

export const postCodeValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return undefined;
    } else {
      return "Numbers only";
    }
  } else {
    return undefined;
  }
};


