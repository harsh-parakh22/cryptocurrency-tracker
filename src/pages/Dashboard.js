import React from "react";
import {
  Box,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import UserData from "../Components/Authentication/Admin/UserData";
import Home from "../Components/Authentication/Admin/Home";
import AdminData from "../Components/Authentication/Admin/AdminData";
import UserMessage from "../Components/Authentication/Admin/UserMessage";
import Footer from "../Components/Footer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight : `2px solid ${theme.palette.divider}`,
    borderBottom : `8px solid ${theme.palette.divider}`,
    borderTop : `3px solid ${theme.palette.divider}`,
    margin: "auto 1150px 100px 0",
  },
  tagline: {
    fontFamily: "Roboto",
    fontSize: "35px",
    margin: "auto 0 auto 420px",
  },
  userMargin: {
    margin: "-350px 0 auto 250px",
  },
  homeMargin: {
    margin: "-320px 0 auto 250px",
  },
  wlMargin: {
    margin: "-320px 0 auto 250px",
  },
  userMsgMargin: {
    margin: "-350px 0 auto 250px",
  },
  adminMargin: {
    margin: "-350px 0 auto 250px",
  },
  btn: {
    height : "10%",
    width : "10%",
    backgroundColor: "orange",
    margin: "-30px 0 auto 1200px",
  },
  homepage: {
    margin: "auto 0 auto 15px",
    fontSize: "18px",
    textDecoration: "underline",
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <a href="/" className={classes.homepage}>
        {" "}
        Homepage{" "}
      </a>
      <br />
      <Typography className={classes.tagline}>
        Welcome to Crypto Creed Dashboard
      </Typography>{" "}
      <br />
      <hr /> <br />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Admins" {...a11yProps(1)} />
        <Tab label="Users" {...a11yProps(2)} />
        <Tab label="User's Feedback/Query" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.homeMargin}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.adminMargin}>
        <AdminData />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.userMargin}>
        <UserData />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.userMsgMargin}>
        <UserMessage />
      </TabPanel>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <Footer />
    </ThemeProvider>
  );
}
// Made with ♥ by Harsh Parakh