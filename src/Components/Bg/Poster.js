import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Anime from "./Anime";

const useStyles = makeStyles((theme) => ({
  poster: {
    backgroundImage: "url(./bg.jpg)",
  },
  posterContent: {
    backgroundRepeat: "no-repeat",
    height : 460,
    display: "flax",
    flexDirection: "column",
    paddingTop : 35,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height : "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Poster = () => {
  const classes = useStyles();
  return (
    <div className={classes.poster}>
      <Container className={classes.posterContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "bold",
              marginBottom : 10,
              marginRight : 5,
              fontFamily: "Roboto Condensed",
            }}
          >
            Crypto Creed
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "lightgrey",
              textTransform: "capitalize",
              fontFamily: "IBM Plex Serif",
            }}
          >
            Get all the Information regarding your favourite Crypto Currency
          </Typography>
        </div>
        <Anime />
      </Container>
    </div>
  );
};

export default Poster;
// Made with ♥ by Harsh Parakh