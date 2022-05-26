import React from "react";
import isNull from "lodash/isNull";
import Avatar from "@material-ui/core/Avatar";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { getAllExceptSelected } from "common/utils";
import { OBJECT_KEYS, TABLE_CELL_ALIGN } from "common/constants";
import { StyledImageContainer, StyledStatus, StyledEmployeeData } from "./styles";
import { getFinalObject } from "../index";

const getParent = (root, id) => {
  let node;

  root.some((item) => {
    if (item.id === id) {
      node = item;
    }
    if (item.children) {
      node = getParent(item.children, id);
    }
    return node;
  });
  return node || null;
};

export const buildNewOptionArray = (options, selectedId) => {
  const nameOptionsUpdated = options?.map((item) => {
    item.originalName = item.name;
    if (!item.isFormatted) {
      const parent = getParent(options, item.parent_id);
      const parentName = isNull(parent) ? "" : `${parent.name} / `;
      item.name = parentName + item.name;
      item.isFormatted = true;
    }
    return item;
  });
  if (selectedId) {
    return getAllExceptSelected(nameOptionsUpdated, selectedId);
  }

  return nameOptionsUpdated;
};

export const getUpdatedList = (list, data) => {
  data.forEach((item) => {
    const newCountItem = item.employees_ids.length;
    const itemToUpdate = getFinalObject(list, item.id);
    const newCountCollaborators = itemToUpdate?.employees_count + newCountItem;
    itemToUpdate.employees_count = newCountCollaborators;
    return itemToUpdate;
  });
  return list;
};

export const MAIN_RELOCATE_EMPLOYEE = (t, classes) => [
  {
    id: OBJECT_KEYS.profileImgUrl,
    align: TABLE_CELL_ALIGN.left,
    isDisablePadding: true,
    label: "",
    isAvatar: true,
    customRender: (rowData) => {
      const { profile_img_url } = rowData;
      return (
        <StyledImageContainer>
          <Avatar
            alt={ "profile picture" }
            src={ profile_img_url && profile_img_url }
            className={ classes.avatar }
          />
          <StyledStatus isActive={ rowData.is_active }>
            {rowData.is_active ? <Check className={ "active" } /> : <Clear className={ "inactive" } />}
          </StyledStatus>
        </StyledImageContainer>
      );
    },
  },
  {
    id: OBJECT_KEYS.fullname,
    align: TABLE_CELL_ALIGN.left,
    isDisablePadding: true,
    label: t("common:common.name"),
    customRender: (rowData) => (
      <StyledEmployeeData>
        <h1>{rowData.full_name}</h1>
        <p>{t(`common:common.roles.${rowData.type.toLowerCase()}`)}</p>
      </StyledEmployeeData>
    ),
  },
];

export const RELOCATE_EMPLOYEE = (t, classes, key) => [
  {
    id: OBJECT_KEYS.profileImgUrl,
    align: TABLE_CELL_ALIGN.left,
    isDisablePadding: true,
    label: "",
    isAvatar: true,
    customRender: (rowData) => {
      const { profile_img_url } = rowData;
      return (
        <Avatar
          alt={ "profile picture" }
          src={ profile_img_url && profile_img_url }
          className={ classes.avatar }
        />
      );
    },
  },
  {
    id: OBJECT_KEYS.fullname,
    align: TABLE_CELL_ALIGN.left,
    isDisablePadding: true,
    label: t("common:common.name"),
  },
  {
    id: OBJECT_KEYS[key],
    align: TABLE_CELL_ALIGN.left,
    isDisablePadding: true,
    label: t(`common:common.${key}`),
  },
];

export const findObjectBy = (key) => ({
  main: OBJECT_KEYS[key],
  key: OBJECT_KEYS.id,
  label: OBJECT_KEYS.name,
});

export const getRelocateAditionalInformation = (toRelocate, key) => ({
  data: toRelocate,
  objKey: {
    key: OBJECT_KEYS[key],
    name: OBJECT_KEYS.name,
  },
});
