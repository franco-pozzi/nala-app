import React from "react";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { ReactComponent as Units } from "assets/images/administrator/units.svg";
import { ReactComponent as Surveys } from "assets/images/administrator/surveys.svg";
import { ReactComponent as Cities } from "assets/images/administrator/city.svg";
import { ReactComponent as Positions } from "assets/images/administrator/positions.svg";
import { ReactComponent as ContractTypes } from "assets/images/administrator/contract_types.svg";
import { ReactComponent as AdditionalFields } from "assets/images/administrator/additional_fields.svg";
import {
  SIZE, MIN_VALUE,
} from "common/constants";
import { isNotValid } from "common/helpers";
export const MODULES_INFO = [
  {
    icon: <Units />,
    text: "units",
    path: "/administrator/units",
    isDisabled: false,
  },
  {
    icon: <Positions />,
    text: "positions",
    path: "/administrator/positions",
    isDisabled: false,
  },
  {
    icon: <Surveys />,
    text: "surveys",
    path: "/administrator/surveys",
    new: true,
    simple: true,
    isDisabled: true,
  },
  {
    icon: <ContractTypes />,
    text: "contract-types",
    path: "/administrator/contract-types",
    isDisabled: false,
  },
  {
    icon: <Cities />,
    text: "cities",
    path: "/administrator/cities",
    isDisabled: false,
  },
  {
    icon: <AdditionalFields />,
    text: "additional-fields",
    path: "/administrator/additional-fields",
    isDisabled: false,
  },
];
export const MODULES_INDEX = {
  units: 0,
  positions: 1,
  surveys: 2,
  contractTypes: 3,
  cities: 4,
  additionalFields: 5,
};

export const UNITS = MODULES_INFO[MODULES_INDEX.units].text;
export const CONTRACT_TYPES = MODULES_INFO[MODULES_INDEX.contractTypes].text;
export const CITIES = MODULES_INFO[MODULES_INDEX.cities].text;
export const POSITIONS = MODULES_INFO[MODULES_INDEX.positions].text;
export const ADDITIONAL_FIELDS = MODULES_INFO[MODULES_INDEX.additionalFields].text;

const findNestedChildrens = (object, targetId) => {
  if (object.id === targetId) {
    return object;
  }
  if (object.children) {
    for (const item of object.children) {
      const check = findNestedChildrens(item, targetId);
      if (check) {
        return check;
      }
    }
  }
  return null;
};

const findChildrens = (list, parentId) => {
  let result = null;
  for (const object of list) {
    result = findNestedChildrens(object, parentId);
    if (result) {
      break;
    }
  }

  return result;
};

export const getFinalObject = (list, parentId) => {
  const moduleList = list;
  if (parentId === null) {
    return moduleList;
  }
  return findChildrens(moduleList, parentId);
};

export const handleRowEdit = (functions, thisModule, rowData) => {
  functions.handleEdit(thisModule, rowData);
};

const handleMove = (functions, thisModule, rowData, t) => {
  functions.handleMoveModal(thisModule, rowData, t);
};

export const pushValidOptions = (rowData, ACTIONS_MENU, DELETE_ACTION_MENU, thisModule, t, functions) => {
  const isAvailableToDelete = rowData.employees_count === MIN_VALUE;
  switch (thisModule) {
  case UNITS:
    const moveAction = {
      title: t("table.actions.move"),
      icon: <SyncAltIcon fontSize={ SIZE.small } />,
      onClick: () => {
        handleMove(functions, thisModule, rowData, t);
      },
    };
    ACTIONS_MENU.push(moveAction);
    ACTIONS_MENU.push(DELETE_ACTION_MENU);
    break;
  case CONTRACT_TYPES:
    if (isAvailableToDelete) {
      ACTIONS_MENU.push(DELETE_ACTION_MENU);
    }
    break;
  default:
    ACTIONS_MENU.push(DELETE_ACTION_MENU);
    break;
  }
};

const getDeleteMessage = (t, thisModule, rowData) => {
  const mainMessage = `${t("common:common.modal_messages.delete_text")} ${t(`modules.${thisModule}.singular_title`)} ${
    rowData.name
  }?`;
  const collaboratorsMessage = `${rowData.employees_count} ${t(`modules.${thisModule}.collaborators`)} `;

  const deleteMessage = isNotValid(rowData.employees_count) || rowData.employees_count === MIN_VALUE
    ? mainMessage
    : `${collaboratorsMessage}${mainMessage}`;
  return deleteMessage;
};

export const handleRowDelete = (functions, t, thisModule, rowData) => functions.viewModal(
  t("common:common.modal_messages.sure_question"),
  "",
  getDeleteMessage(t, thisModule, rowData),
  t("common:common.modal_messages.yes_confirm"),
  t("common:common.modal_messages.no_cancel"),
  () => {
    functions.handleDelete(thisModule, rowData.id);
  },
);
