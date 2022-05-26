export const resetFormData = (data, userId) => {
  return {
    employee_id: userId,
    starting_date: data.starting_date,
    ending_date: data.ending_date,
    reason: data.reason,
    time_off_type_id: data.time_off_type.id,
  };
};

export const getFileName = (url) => {
  return decodeURI(url.substring(url.lastIndexOf("/") + 1));
};
