import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { VARIANT } from "common/constants";
import checkIcon from "assets/images/sign-in/check.svg";
import { CommercialText, RegisterContainer, RegisterLink } from "./styles";

const RegisterNowBox = () => {
  const { t } = useTranslation(["common", "authentication"]);
  return (
    <div data-testid={ "register-now" }>
      <RegisterContainer>
        <Typography variant={ VARIANT.bodyOne }>
          {t("authentication:no_account")}
        </Typography>
        <Link to={ "/" }>
          <RegisterLink variant={ VARIANT.h6 }>
            {t("authentication:register_now")}
          </RegisterLink>
        </Link>
      </RegisterContainer>
      <Grid container>
        <Grid container item md={ 5 }>
          <Grid item md={ 2 } lg={ 1 }>
            <img src={ checkIcon } alt={ "Check Icon" } />
          </Grid>
          <Grid item md={ 10 } lg={ 11 }>
            <CommercialText variant={ VARIANT.bodyTwo }>
              {t("authentication:free_text")}
            </CommercialText>
          </Grid>
        </Grid>
        <Grid container item md={ 7 }>
          <Grid item md={ 2 } lg={ 1 }>
            <img src={ checkIcon } alt={ "Check Icon" } />
          </Grid>
          <Grid item md={ 10 } lg={ 11 }>
            <CommercialText variant={ VARIANT.bodyTwo }>
              {t("authentication:no_credit_card")}
            </CommercialText>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterNowBox;
