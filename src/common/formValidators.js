import i18n from "i18next";

export const getErrorMessage = (errors, field) => {
  if (errors[field]?.message) {
    return errors[field].message;
  }

  if (errors[field]?.type) {
    return `${i18n.t(`formValidations:fields.${field}`)} ${i18n.t(`formValidations:validations.${errors[field].type}`)}`;
  }
  return null;
};
