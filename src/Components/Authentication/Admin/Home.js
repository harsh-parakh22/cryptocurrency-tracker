import { Card, Paper, Typography, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);

  const useStyles = makeStyles((theme) => ({
    head: {
      fontFamily: "Hind Siliguri",
      fontSize: "30px",
      fontWeight: "bold",
      color: "black",
      margin: "-20px 0 auto 15px",
    },
    paper: {
      height : "50px",
      width : "500px",
      backgroundColor: "orange",
      margin: "auto 0 auto -50px",
    },
    Ucard: {
      height : "80px",
      width : "180px",
      padding: 2,
      margin: "auto 0 auto 300px",
    },
    Acard: {
      height : "80px",
      width : "190px",
      padding: 2,
      margin: "-105px 0 auto 500px",
    },
    Utext: {
      margin: "auto 0 auto 15px",
    },
    Atext: {
      margin: "auto 0 auto 12px",
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const count = querySnapshot.size;
        setTotalUsers(count);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalAdmin = async () => {
      try {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, "admins"));
        const count = querySnapshot.size;
        setTotalAdmin(count);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchTotalAdmin();
  }, []);

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.head}>
          Hello Admin, Good to have you back.
        </Typography>
      </Paper>
      <br />
      <Card className={classes.Ucard}>
        <Typography className={classes.Utext}>
          <h2>
            Total Users :
            <br /> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            {totalUsers}
          </h2>
        </Typography>
      </Card>
      <br />
      <Card className={classes.Acard}>
        <Typography className={classes.Atext}>
          <h2>
            Total Admins :
            <br /> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            {totalAdmin}
          </h2>
        </Typography>
      </Card>
    </>
  );
};

export default Home;
// Made with ♥ by Harsh Parakh