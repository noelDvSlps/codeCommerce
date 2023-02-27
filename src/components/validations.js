import validator from "validator";
import moment from "moment";

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Enter a Valid Card";
      }
    }
  }
  return "Enter a Valid Card";
};

export const cardExpireValidation = (value) => {
  if (value) {
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate()}`;
      let currentDate = moment(new Date(date));
      let visaValue = value.split("/");
      let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
      return currentDate < moment(visaDate)
        ? undefined
        : "Please enter a valid date";
    } else {
      return "Invalid Date Format";
    }
  }
};



export const securityCodeValidation = (min, value, callback) =>
{
  
  const callBackResult = callback(value)
 const error1 = callBackResult !== undefined ? callBackResult : "" ;
  const error2 = value && value.length < min ? "Must be 3 character or more" : "";
  let error = (error1.length ? `${error1} ` : "")  + error2
  
  if (error === ""){
    error = undefined;
  } 
  return error;
};
  


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

export const alphaNumericValidation = (value) => {
  if (value) {
    if ((/^[a-zA-Z 0-9]*$/i.test(value)) && value.length > 7 && value.length < 21) {
      return undefined;
    } else {
      return "Numbers and Letters only";
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

export const onlyNumberValidation = (value) => {
  
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


