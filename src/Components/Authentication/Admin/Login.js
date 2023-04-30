import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { CryptoState } from "../../../CryptoContext";
import { hashMessage } from "ethers/lib/utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [names, setNames] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [secreteKey, setSecreteKey] = useState("");
  const [result, setResult] = useState("");

  const useStyles = makeStyles((theme) => ({
    recaptchaContainer: {
      marginLeft : 30,
    },
    phone: {
      height : "20px",
    },
  }));

  const classes = useStyles();
  const { setAlert } = CryptoState();
  const auth = getAuth();
  const adminRef = collection(db, "admins");
  const history = useHistory();

  const handleLogin = async () => {
    if (!names || !number || !otp || !secreteKey) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
    if (secreteKey !== "cryptocreed") {
      setAlert({
        open: true,
        message: "You are not admin! Please enter correct Secrete key",
        type: "error",
      });
      return;
    } else {
      history.push("/adminDashboard");
      setAlert({
        open: true,
        message: "Welcome Admin !",
        type: "success",
      });
    }
    addDoc(adminRef, {
      names: names,
      number: number,
      secreteKey: hashMessage(secreteKey),
    });
  };

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setAlert({
      open: true,
      message: "Please Verify!",
      type: "info",
    });
    if (number === "" || number === undefined)
      setAlert({
        open: true,
        message: "please enter valid mobile no.",
        type: "error",
      });
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
    } catch (err) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
      return;
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      setAlert({
        open: true,
        message: "valid OTP",
        type: "success",
      });
    } catch (err) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "18px",
          marginTop : "-5px",
        }}
      >
        <TextField
          variant="outlined"
          type="textarea"
          label="Enter Name"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          fullWidth
        />

        <div className={classes.phone}>
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter Phone Number"
          />
        </div>

        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "orange" }}
          onClick={getOtp}
        >
          Send OTP
        </Button>
        <div id="recaptcha-container" className={classes.recaptchaContainer} />

        <TextField
          type="number"
          variant="outlined"
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "orange" }}
          onClick={verifyOtp}
        >
          Verify OTP
        </Button>

        <TextField
          variant="outlined"
          type="password"
          label="Enter Secret Key"
          value={secreteKey}
          onChange={(e) => setSecreteKey(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "orange" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
// Made with ♥ by Harsh Parakh