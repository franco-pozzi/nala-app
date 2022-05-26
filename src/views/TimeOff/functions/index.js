import moment from "moment";
import { FULLDATE_FORMATS, LOCAL_STORAGE_NAMES, VARIANT, /*DATE_PARTS*/ } from "common/constants";
import { getItemFromLocalStorage } from "common/utils";
import { isEmpty } from "common/helpers";

export const getTabs = (t) => {
  const defaultTabs = [
    { label: t("timeOff:tabs.personal") },
    { label: t("timeOff:tabs.team") },
  ];
  return defaultTabs;
};

export const treatAsUTC = (date) => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};

export const daysBetween = (startDate, endDate) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
};

// const calcBusinessDays = (startDate, endDate) => {
//   const day = moment(startDate);
//   let businessDays = 0;

//   while (day.isSameOrBefore(endDate, DATE_PARTS.day)) {
//     if (day.day() !== 0 && day.day() !== 6) {
//       businessDays++;
//     }
//     day.add(1, "d");
//   }
//   return businessDays;
// };

export const getExcelData = (excelList, t) => {
  const data = excelList.map((item) => ({
    [t("timeOff:excel.Personal id")]: item.employee.personal_id,
    [t("timeOff:excel.Name")]: item.employee.full_name,
    [t("timeOff:excel.Email")]: item.employee.email,
    [t("timeOff:excel.Manager name")]: item.employee.manager_name,
    [t("timeOff:excel.Starting date")]: moment(item.starting_date).format(FULLDATE_FORMATS.dash),
    [t("timeOff:excel.Finish date")]: moment(item.ending_date).format(FULLDATE_FORMATS.dash),
    // [t("timeOff:excel.Number of calendar days")]: daysBetween(treatAsUTC(item.starting_date), treatAsUTC(item.ending_date)),
    // [t("timeOff:excel.Number of business days")]: calcBusinessDays(item.starting_date, item.ending_date),
    [t("timeOff:excel.Type")]: item.time_off_type?.name,
    [t("timeOff:excel.Reason")]: item.reason,
    [t("timeOff:excel.State")]: t(`timeOff:states.${item.state}`),
  }));
  return data;
};

export const getTimeOffTypes = (t) => {
  const timeOffTypeList = [{ value: VARIANT.default, label: t("common:common.type") }];
  const timeOffTypes = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.timeOffTypes);

  if (!isEmpty(timeOffTypeList)){
    timeOffTypes.forEach((timeOffType) => {
      timeOffTypeList.push({
        value: timeOffType.id,
        label: timeOffType.name,
      })
    });
  }
  return timeOffTypeList;
}
