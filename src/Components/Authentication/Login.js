import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  forgot: {
    margin: "auto 0 auto 230px",
    fontWeight: "bold",
  },
}));

const Login = ({ handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    {
      const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regExp.test(email)) {
        setAlert({
          open: true,
          message: "Please Enter Valid Email Address!",
          type: "error",
        });
      }
      console.log(email);
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
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
        onClick={RegExp}
        fullWidth
      />

      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "orange" }}
      >
        Login
      </Button>
      <a href="/forgotPassword" className={classes.forgot}>
        Forgot Password?{" "}
      </a>
    </Box>
  );
};

export default Login;
// Made with ♥ by Harsh Parakh