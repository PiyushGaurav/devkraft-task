export const isNameEngValidated = (name) => {
  const nameRejexEng = new RegExp('^[A-z ]+$');
  return nameRejexEng.test(name);
};
export const validateOnlyNumber = (n) => {
  var numRegex = new RegExp('^[0-9]+$');
  return numRegex.test(n);
};
export const isPasswordValidated = (pass) => {
  var emailRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );
  return emailRegex.test(pass);
};
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validate = (fieldName, text) => {
  switch (fieldName) {
    case 'name':
      return isNameEngValidated(text);
    case 'email':
      return validateEmail(text);
    case 'phoneNumber':
      return validateOnlyNumber(text);
    case 'password':
    case 'confirmPassword':
      return isPasswordValidated(text);
    case 'address':
    case 'dob':
    case 'photo':
      return true;
    default:
      return true;
  }
};
