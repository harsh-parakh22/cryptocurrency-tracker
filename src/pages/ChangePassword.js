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
import { makeStyles } from "@material-ui/core";
import { confirmPasswordReset } from "firebase/auth";
import { useEffect } from "react";
import Footer from "../Components/Footer";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "5px -200px auto 70px",
    fontWeight: "bold",
  },
  paper: {
    height : 350,
    width : 450,
    color: "white",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "150px  0 auto 480px",
  },
  login: {
    margin: "auto 0 auto 45px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  tagline: {
    fontFamily: "Roboto",
    fontSize: "22px",
    textAlign: "center",
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await confirmPasswordReset(
        auth,
        oobCode,
        password,
        confirmPassword
      );
      setAlert({
        open: true,
        message: `Password has been changed Successfully `,
        type: "success",
      });

      console.log(result);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const oobCode = searchParams.get("oobCode");
    if (oobCode) {
      setOobCode(oobCode);
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <br />
      <br />
      <Typography className={classes.tagline}>
        Secure your account by changing your password - it's quick and easy.
      </Typography>
      <div className={classes.paper} style={{ backgroundColor: "#5A5A5A" }}>
        <Typography variant="subtitle1" className={classes.heading}>
          {" "}
          Change Password{" "}
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
            label="Enter New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            style={{ backgroundColor: "orange" }}
          >
            Change Password
          </Button>
          <a href="/" className={classes.login}>
            {" "}
            Click here to Login{" "}
          </a>
        </Box>
      </div>{" "}
      <br /> <br /> <br /> <br />
      <Footer />
    </ThemeProvider>
  );
};

export default ChangePassword;
// Made with ♥ by Harsh Parakh