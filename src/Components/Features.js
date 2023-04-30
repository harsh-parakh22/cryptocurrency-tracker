import { Container, makeStyles, Typography, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    margin: -10,
    marginLeft : 500,
    color: "orange",
    fontFamily: "Open Sans",
  },
  featureContent: {
    color: "darkgrey",
    margin: "75px 30px auto 635px",
    fontFamily: "Open Sans",
    fontSize: "26.5px",
  },
  featureImg: {
    width : "650px",
    minHeight : "500px",
    marginLeft : "-20px",
    marginBottom : "95px",
    marginTop : "-530px",
  },
}));

const Features = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Container>
        <Typography variant="h3" className={classes.title}>
          <div id="features">Feature</div>
        </Typography>{" "}
        <br />
        <div>
          <Typography varient="h6" className={classes.featureContent}>
            Experience the future of finance with our ultimate Cryptocurrency
            platform. Manage your wealth securely and easily with our
            comprehensive suite of Cryptocurrency services. Get up-to-date
            information on all cryptocurrencies, as well as specific coins, and
            stay ahead of the curve. Stay informed with the latest news on
            cryptocurrency all in one place. Join us today and start growing
            your wealth with ease.
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width : 110,
                height : 55,
                marginLeft : 200,
                backgroundColor: "orange",
              }}
              onClick={() => {
                history.push("/feature/cointable");
                window.scroll(100, 0);
              }}
            >
              Browse More
            </Button>
          </Typography>
          <img
            src="./featureimg2.png"
            alt="test-img"
            className={classes.featureImg}
          />
        </div>
      </Container>
    </div>
  );
};

export default Features;
// Made with ♥ by Harsh Parakh