import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { auth } from "../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { makeStyles } from "@material-ui/core";
import Footer from "../Components/Footer";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "5px -200px auto 60px",
    fontWeight: "bold",
  },
  paper: {
    height : 300,
    width : 450,
    color: "white",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "150px 0 auto 460px",
  },
  login: {
    margin: "auto 0 auto 40px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  tagline: {
    fontFamily: "Roboto",
    fontSize: "22px",
    textAlign: "center",
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email) {
      setAlert({
        open: true,
        message: "Please enter email id",
        type: "error",
      });
      return;
    }

    try {
      const sendPasswordReset = await sendPasswordResetEmail(auth, email);
      setAlert({
        open: true,
        message: `Email has been sent successfully `,
        type: "success",
      });

      console.log(sendPasswordReset);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <br /> <br />
        <Typography className={classes.tagline}>
          Don't stress over a forgotten password☻
        </Typography>
        <div className={classes.paper} style={{ backgroundColor: "#5A5A5A" }}>
          <Typography variant="subtitle1" className={classes.heading}>
            {" "}
            Forgot Password?{" "}
          </Typography>

          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              padding: "18px",
            }}
          >
            <TextField
              variant="outlined"
              type="email"
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              style={{ backgroundColor: "orange" }}
            >
              Send Link
            </Button>
            <a href="/" className={classes.login}>
              {" "}
              Click here to Login{" "}
            </a>
          </Box>
        </div>
        <br /> <br /> <br /> <br /> <br /> <br />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default ForgotPassword;
// Made with ♥ by Harsh Parakh