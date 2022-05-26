import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import noInfoFace from "assets/images/tables/noInfoFace.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFound = () => {
  const isMaintance = false; // note: faster way to shut down the app is setting up this on FALSE.
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Grid
        container
        justify={ "center" }
        spacing={ 4 }
      >
        <Grid
          item
          lg={ 6 }
          xs={ 12 }
        >
          <div className={ classes.content }>
            <Typography variant={ "h1" }>{ isMaintance ? "NALA is under maintenance" : "404: The page you are looking for isn’t here" }</Typography>
            <Typography variant={ "subtitle2" }>
              {isMaintance ? "We are working to be back soon" : "You either tried some shady route or you came here by mistake."}
              {!isMaintance && "Whichever it is, try using the navigation"}
            </Typography>
            {isMaintance ? (
              <Box mt={ 5 }>
                <img
                  src={ noInfoFace }
                  alt={ "No info to load" }
                  width={ 200 }
                  height={ 200 }
                />
              </Box>

            ) : (
              <img
                alt={ "Under development" }
                className={ classes.image }
                src={ "/images/undraw_page_not_found_su7k.svg" }
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
