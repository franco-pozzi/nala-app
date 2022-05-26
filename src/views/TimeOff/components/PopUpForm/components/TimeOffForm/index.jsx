import React, { useState, useEffect, useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { SessionContext } from "modules/session/context";
import { create, update } from "redux/actions/timeOffActions";
import SelectController from "components/SelectController";
import DateInputController from "components/DateInputController";
import Button from "components/Button";
import InputForm from "components/InputForm";
import { toast, MESSAGE_TYPES } from "components/Toast/functions";
import { getEmployeeId } from "common/utils";
import {
  INPUT_TYPE,
  BUTTON_TYPE,
  SIZE,
  ALIGN_ITEMS,
  VARIANT,
  DIRECTION,
  TARGET,
} from "common/constants";
import { isNullOrUndefined } from "common/helpers";
import FileInputTimeOff from "./components/FileInputTimeOff";
import { getFileName, resetFormData } from "../../functions";
import useStyles, { StyledSubmitGrid, StyledFileGrid, StyledItem } from "./styles";

const TimeOffForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const {
    data,
    isMobile,
    selectOptions,
    onChangeFile = () => { },
    onClose = () => { },
  } = props;
  const classes = useStyles();

  const [files, setFiles] = useState([]);

  const {
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm();
  const watchSelect = watch("time_off_type_id", VARIANT.default);
  const watchFromDate = watch("starting_date");
  const today = new Date();

  const removeFile = (selectedFile) => {
    const filtered = files.filter((file) => file.name !== selectedFile);
    return setFiles(filtered);
  };

  const updateFiles = (target) => {
    const file = target.files[0];
    target.value = "";
    if (file) {
      if (file.size > 5000000) {
        return toast(MESSAGE_TYPES.error, {
          title: t("common.files.exceedSizeLimit"),
        });
      }
      return setFiles((prevValue) => [...prevValue, file]);
    }
  };

  const { isLoadingProcess } = useSelector(({ timeOffReducer }) => timeOffReducer);
  const {
    state: { user },
  } = useContext(SessionContext);

  const userId = getEmployeeId(user);

  const resetForm = useCallback(() => {
    const editData = resetFormData(data, userId);
    if (editData) reset(editData);
  }, [reset, data, userId]);

  useEffect(() => {
    if (!isNullOrUndefined(data)) {
      resetForm();
    }
  }, [data, resetForm, dispatch]);

  const onSubmit = async () => {
    const formData = new FormData();
    const form = control.getValues();
    files.forEach((element) => formData.append("time_off[files][]", element));
    formData.append("time_off[employee_id]", userId);
    formData.append("time_off[starting_date]", form.starting_date);
    formData.append("time_off[ending_date]", form.ending_date);
    formData.append("time_off[reason]", form.reason);
    formData.append("time_off[time_off_type_id]", form.time_off_type_id);

    if (data?.id) {
      dispatch(update(data.id, formData, true));
    } else {
      dispatch(create(formData));
    }
    return onClose();
  };

  const lastFiles = (filesList) => filesList.map((item) => (
    <StyledItem key={ item.title }>
      <Link href={ item } target={ TARGET.blank }>
        { getFileName(item) }
      </Link>
    </StyledItem>
  ));

  return (
    <form data-testid={ "time-off-form-view-component" } onSubmit={ handleSubmit(onSubmit) }>
      <Grid container direction={ DIRECTION.column } spacing={ 5 }>
        <Grid item container direction={ DIRECTION.row } spacing={ 4 }>
          <Grid item xs={ 12 } md={ 6 }>
            <DateInputController
              control={ control }
              label={ t("common.from") }
              name={ "starting_date" }
              value={ today }
              customStyles={ classes.dateInputs }
            />
            <DateInputController
              control={ control }
              label={ t("common.to") }
              name={ "ending_date" }
              minDate={ watchFromDate }
              value={ today }
              customStyles={ classes.dateInputs }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 6 }>
            <SelectController
              control={ control }
              menuItems={ selectOptions }
              defaultValue={ VARIANT.default }
              name={ "time_off_type_id" }
              id={ "time_off_type_id" }
            />
          </Grid>
        </Grid>
        <Grid item container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <InputForm
              type={ INPUT_TYPE.text }
              control={ control }
              placeholder={ t("common.write_description") }
              name={ "reason" }
              label={ `${t("common.reason")} (optional)` }
              multiline={ 4 }
            />
          </Grid>
          <StyledFileGrid isMobile={ isMobile } item xs={ 12 }>
            <FileInputTimeOff
              control={ control }
              onChangeFile={ onChangeFile }
              files={ files }
              updateFiles={ updateFiles }
              removeFile={ removeFile }
              lastFiles={ lastFiles(data?.files_url || []) }
            />
          </StyledFileGrid>
          <StyledSubmitGrid
            item
            sm={ 12 }
            container
            direction={ DIRECTION.row }
            alignItems={ ALIGN_ITEMS.center }
          >
            <Button
              variant={ VARIANT.contained }
              type={ BUTTON_TYPE.submit }
              typeStyle={ BUTTON_TYPE.submit }
              size={ SIZE.medium }
              isLoading={ isLoadingProcess }
              isDisabled={ watchSelect === VARIANT.default }
            >
              {t("common.send_request")}
            </Button>
          </StyledSubmitGrid>
        </Grid>
      </Grid>
    </form>
  );
};

TimeOffForm.propTypes = {
  selectOptions: PropTypes.any.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  isMobile: PropTypes.bool,
};

TimeOffForm.defaultProps = {
  data: null,
  isMobile: false,
};

export default TimeOffForm;
