import {
  Container,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft : 620,
    color: "orange",
    fontSize: 50,
    fontFamily: "Open Sans",
  },
  tagline: {
    margin: "50px 0 50px 300px",
    fontFamily: "Roboto",
    fontSize: "25px",
  },
  newsTable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto 0 auto 250px",
  },
  imgs: {
    display: "flex",
    width : "auto",
    height : "100%",
    objectFit: "cover",
    margin: "auto 0 auto 200px",
  },
  txtClr: {
    color: "darkgrey",
  },
  paper: {
    margin: "auto 200px auto 0",
    padding: 20,
    boxShadow: "3px 2px 5px 3px darkgrey",
    borderRadius: "10px",
    width : "700px",
  },
}));

const News = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const fetchData = async () => {
    await axios
      .get(
        "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=a75074f4a126e5ab594d26c84fdde986ebe95a39a078e534ad17591a8ea63836"
      )
      .then((res) => {
        const responseData = res.data.Data;
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography className={classes.title}>News</Typography>
      <Container>
        <Typography className={classes.tagline}>
          Here You can Enjoy The Latest News Regarding Cryptocurrencies.
        </Typography>
        <hr />
        <br />
        <br />
        <Container>
          <div className={classes.newsTable}>
            {data.length > 0 ? (
              data.map(function (items, index) {
                const truncatedBody = items.body.slice(0, 300);
                return (
                  <React.Fragment key={index}>
                    <div className={classes.paper}>
                      <h3>{items.title}</h3>
                      <br />
                      <br />
                      <img
                        src={items.imageurl}
                        alt="img not found"
                        className={classes.imgs}
                      />{" "}
                      <br />
                      <br />
                      <h4 className={classes.txtClr}>
                        {truncatedBody}{" "}
                        <a href={items.url} target="blank">
                          View More
                        </a>{" "}
                        <br /> <br />{" "}
                      </h4>
                    </div>{" "}
                    <br /> <br />
                  </React.Fragment>
                );
              })
            ) : (
              <LinearProgress style={{ backgroundColor: "orange" }} />
            )}
          </div>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default News;

// Made with ♥ by Harsh Parakh