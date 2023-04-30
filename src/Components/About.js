import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft : 500,
    color: "orange",
    fontFamily: "Open Sans",
  },
  aboutContent: {
    color: "darkgrey",
    margin: "80px 700px -180px -10px;",
    fontFamily: "Open Sans",
    fontSize: "25.5px",
  },
  aboutImg: {
    width : "50%",
    minHeight : "500px",
    marginLeft : "630px",
    marginTop : "-350px",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        <div id="about">About Us</div>
      </Typography>{" "}
      <br />
      <Typography varient="h6" className={classes.aboutContent}>
        At Crypto Creed, our mission is to make it easy for users to stay
        informed about the latest developments in the cryptocurrency market. We
        believe that everyone should have access to the tools and information
        they need to make informed decisions about their investments.
        <span>
          That's why we created Crypto Creed, a comprehensive cryptocurrency
          tracker that provides real-time data and analysis. With Crypto Creed,
          you can track your watchlist and stay up-to-date with the every
          cryptocurrency.
        </span>
      </Typography>
      <img src="./aboutus(1).png" alt="img" className={classes.aboutImg} />
    </Container>
  );
};

export default About;
// Made with ♥ by Harsh Parakh