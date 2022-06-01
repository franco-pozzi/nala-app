import moment from "moment";
import { ALIGN_ITEMS, DATE_PARTS } from "common/constants";
import { STATES } from "common/constants/timeOff";
import { GANT_COLOR, GANT_LETTER_COLOR } from "theme/palette";

const STATES_BACKGROUND = {
  pending: GANT_COLOR.pending,
  rejected: GANT_COLOR.rejected,
  vacations: GANT_COLOR.vacations,
  medical_license: GANT_COLOR.medicalLicense,
  approved: GANT_COLOR.approved,
};

const LETTER_STATES = {
  pending: GANT_LETTER_COLOR.pending,
  rejected: GANT_LETTER_COLOR.rejected,
  vacations: GANT_LETTER_COLOR.vacations,
  medical_license: GANT_LETTER_COLOR.medicalLicense,
  approved: GANT_LETTER_COLOR.approved,
};

export const getGantColor = (state, timeOffType, isLetter) => {
  if (state === STATES.pending || state === STATES.rejected || state === STATES.approved ) {
    return isLetter ? LETTER_STATES[state] : STATES_BACKGROUND[state];
  }
  return isLetter ? LETTER_STATES[timeOffType] : STATES_BACKGROUND[timeOffType];
};

export const formatItems = (data, statesFilter, t) => {
  let formatedItems = [];
  if (data) {
    data.forEach((element) => {
      element.time_offs.forEach((timeOff) => {
        const title = timeOff.state === STATES.pending || timeOff.state === STATES.rejected || timeOff.state === STATES.approved_by_leader ? t(`states.${timeOff.state}`) : timeOff.time_off_type?.name;
        const itemColor = getGantColor(timeOff.state, timeOff.time_off_type?.name);
        const letterColor = getGantColor(timeOff.state, timeOff.time_off_type?.name, true);
        formatedItems.push({
          id: timeOff.id,
          type: timeOff.time_off_type?.name,
          state: timeOff.state,
          group: element.id,
          files: timeOff.files_url,
          rejection_reason: timeOff.rejection_reason,
          title,
          start_time: moment(timeOff.starting_date).add(0, DATE_PARTS.day),
          end_time: moment(timeOff.ending_date).add(0, DATE_PARTS.day),
          canMove: false,
          itemProps: {
            borderRadius: 0,
            style: {
              background: itemColor,
              color: letterColor,
              border: 0,
              textAlign: ALIGN_ITEMS.center,
              fontSize: 14,
              paddingTop: 20,
            },
          },
        });
      });
    });
  }

  if (statesFilter.length > 0) {
    formatedItems = formatedItems.filter((item) => statesFilter.includes(item.state));
  }
  return formatedItems;
};
