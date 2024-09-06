import * as yup from "yup";

// const emailValidation = yup
//     .string()
//     .test("email", "Invalid email", function (value) {
//         if (!value) return true;
//         return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
//     })
//     .required("Email is required");

const emailValidation = yup
  .string()
  .test("email", "Invalid email", function (value) {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  })
  .required("Email is required");

const checkboxValidation = yup.boolean().oneOf([true], "You must agree to the Privacy Policy and Terms of Service");

export const registrationValidation = yup.object({
  email: yup.string().required("Email is required"),
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'The Password requires capital and lowercase letters, numbers, symbols (@$!%*?&) and be at least 8 characters long.'
  ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: yup.boolean().oneOf([true], "You must agree to the Privacy Policy and Terms of Services").required("You must agree to the Privacy Policy and Terms of Services"),
});

export const loginValidation = yup.object({
  userName: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
  terms: yup.boolean().oneOf([true], "You must agree to the Privacy Policy and Terms of Services").required("You must agree to the Privacy Policy and Terms of Services"),

});

export const forgetPassword = yup.object({
  email: yup.string().required("Email is required"),
});

export const conformPassword = yup.object({
  newPassword: yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'The Password requires capital and lowercase letters, numbers, symbols (@$!%*?&) and be at least 8 characters long.'
  ),
  // newPassword: yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const editProfileValidation = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  mobileNumber: yup.string().required("Mobile is required"),
  dob: yup.string().required("Dob is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
});

export const addExperinceValidation = yup.object({
  AmountsperMinute: yup.string().required("Amount per minute is required"),
  notesForUser: yup.string().required("Notes For User is required"),
  ExperienceName: yup.string().required("Experience Name is required"),
  about: yup.string().required("About is required"),
});

export const createOfferValidation = yup.object({
  Title: yup.string().required("Title is required"),
  price: yup.string().required("price is required"),
  Minutes: yup.string().required("Minutes is required"),
  ZipCode: yup.string().required("ZipCode is required"),
  Notes: yup.string().required("Notes is required"),
});

export const atarAvailableValidation = yup.object({
  from: yup.string().required("From is required"),
  to: yup.string().required("To is required"),
  fromPeriod: yup.string().required("From Period is required"),
  toPeriod: yup.string().required("To Period is required"),
  timeZone: yup.string().required("Time Zone is required"),
});
