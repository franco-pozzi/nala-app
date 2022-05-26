const email = "?email=";
const companyId = "?company_id=";
const resetPasswordToken = "&reset_password_token=";

export const SIGN_IN = {
  root: "/sessions",
};

export const RESET_PASSWORD = {
  root: "/user",
  resetPassword: "/reset_password",
  resetToken: "/check_reset_token",
  password: "/password",
  auth: "/auth",
  users: "/users",
  companyId,
  resetPasswordToken,
  email,
};

export const CHANGE_PASSWORD = {
  root: "/users",
  password: "password",
  companyId,
};
