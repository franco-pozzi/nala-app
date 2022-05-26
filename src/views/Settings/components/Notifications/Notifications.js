import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckboxInput from "../../../../components/CheckboxInput";
import Button from "../../../../components/Button";

const useStyles = makeStyles(() => ({
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Notifications = function (props) {
  const { className, ...rest } = props;
  const classes = useStyles();

  const handleClick = () => {
    // Save form notifications
  };
  const [values, setValues] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      textNotifications: true,
      phoneNotifications: false,
    },
    messages: {
      textMessages: false,
      pushMessages: false,
      emailMessages: true,
    },
  });

  const handleChange = (prop, event) => {
    if (prop.endsWith("Messages")) {
      setValues({
        notifications: { ...values.notifications },
        messages: {
          ...values.messages,
          [prop]: event.target.checked,
        },
      });
    } else {
      setValues({
        notifications: {
          ...values.notifications,
          [prop]: event.target.checked,
        },
        messages: { ...values.messages },
      });
    }
  };

  return (
	<Card { ...rest } className={ clsx(classes.root, className) }>
	<form>
	<CardHeader
	subheader={ "Manage the notifications" }
	title={ "Notifications" }
        />
	<Divider />
	<CardContent>
	<Grid container spacing={ 6 } wrap={ "wrap" }>
	<Grid className={ classes.item } item md={ 4 } sm={ 6 } xs={ 12 }>
	<Typography gutterBottom variant={ "h6" }>
	Notifications
              </Typography>
	<CheckboxInput
	label={ "Email" }
	isChecked={ values.notifications.emailNotifications }
	color={ "primary" }
	id={ "emailNotifications" }
	onChange={ handleChange }
              />
	<CheckboxInput
	label={ "Push Notifications" }
	isChecked={ values.notifications.pushNotifications }
	color={ "primary" }
	id={ "pushNotifications" }
	onChange={ handleChange }
              />
	<CheckboxInput
	label={ "Text Messages" }
	isChecked={ values.notifications.textNotifications }
	color={ "primary" }
	id={ "textNotifications" }
	onChange={ handleChange }
              />
	<CheckboxInput
	label={ "Phone calls" }
	isChecked={ values.notifications.phoneNotifications }
	color={ "primary" }
	id={ "phoneNotifications" }
	onChange={ handleChange }
              />
            </Grid>
	<Grid className={ classes.item } item md={ 4 } sm={ 6 } xs={ 12 }>
	<Typography gutterBottom variant={ "h6" }>
	Messages
              </Typography>
	<CheckboxInput
	label={ "Email" }
	isChecked={ values.messages.emailMessages }
	color={ "primary" }
	id={ "emailMessages" }
	onChange={ handleChange }
              />
	<CheckboxInput
	label={ "Push Notifications" }
	isChecked={ values.messages.pushMessages }
	color={ "primary" }
	id={ "pushMessages" }
	onChange={ handleChange }
              />
	<CheckboxInput
	label={ "Text Messages" }
	isChecked={ values.messages.textMessages }
	color={ "primary" }
	id={ "textMessages" }
	onChange={ handleChange }
              />
            </Grid>
          </Grid>
        </CardContent>
	<Divider />
	<CardActions>
	<Button variant={ "outlined" } onClick={ handleClick }>{"Save"}</Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
};

export default Notifications;
