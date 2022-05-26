import { STATES } from "common/constants/timeOff";

export const filterByCriteria = (data, criteriaFunc) => data.reduce(
  (i, value) => (criteriaFunc(value.state) ? i + 1 : i), 0,
);

export const getConfirmed = (data) => filterByCriteria(data, (state) => state !== STATES.pending);

export const getPending = (data) => filterByCriteria(data, (state) => state === STATES.pending);

export const getEnjoyed = (data) => {
  const today = new Date();
  let enjoyed = 0;
  data.forEach((item) => {
    const endDate = new Date(item.ending_date);
    if (item.state === STATES.approved && endDate.getTime() < today.getTime()) {
      enjoyed += 1;
    }
  });

  return enjoyed;
};
