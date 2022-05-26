import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import MenuPopup from "components/MenuPopup";
import { formatDate } from "common/utils";
import {
  OBJECT_KEYS, WIDTH, FULLDATE_FORMATS, SIZE, ALIGN_ITEMS,
} from "common/constants";
import { UNITS, handleRowDelete, handleRowEdit, pushValidOptions } from "../index";

export const getContractTableHeader = (t, thisModule, functions, classes) => [
  {
    id: OBJECT_KEYS.name,
    label: t(`modules.${thisModule}.title`),
    collapseCell: { isActive: thisModule === UNITS },
    width: WIDTH.text,
  },
  {
    id: OBJECT_KEYS.employmentRelationship,
    label: t("common:common.employment_relationship"),
    width: WIDTH.text,
  },
  {
    id: OBJECT_KEYS.createdAt,
    label: t("table.create_date"),
    width: WIDTH.date,
    align: ALIGN_ITEMS.center,
    customRender: (rowData) => {
      return formatDate(rowData.created_at, FULLDATE_FORMATS.slash);
    },
  },
  {
    id: OBJECT_KEYS.employeesCount,
    label: t("table.collaborators"),
    width: WIDTH.text,
    align: ALIGN_ITEMS.center,
  },
  {
    id: OBJECT_KEYS.principalActions,
    label: t("table.actions.main"),
    customRender: (rowData) => {
      const DELETE_ACTION_MENU = {
        title: (
          <div className={ classes.delete }>{t("table.actions.delete")}</div>
        ),
        icon: (
          <HighlightOffIcon fontSize={ SIZE.small } className={ classes.delete } />
        ),
        onClick: () => {
          handleRowDelete(functions, t, thisModule, rowData);
        },
      };

      const ACTIONS_MENU = [
        {
          title: t("table.actions.edit"),
          icon: <EditIcon fontSize={ SIZE.small } />,
          onClick: () => {
            handleRowEdit(functions, thisModule, rowData);
          },
        },
      ];

      pushValidOptions(
        rowData,
        ACTIONS_MENU,
        DELETE_ACTION_MENU,
        thisModule,
        t,
        functions,
      );

      return <MenuPopup menuItems={ ACTIONS_MENU } />;
    },
    width: WIDTH.actions,
  },
  {
    id: "",
    label: "",
    width: WIDTH.actions,
  },
];

