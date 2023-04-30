import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../Firebase";
import { db } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore";
import { hashMessage } from "ethers/lib/utils";

const Signup = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();
  const userRef = collection(db, "users");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });

      if (!name || !email || !password || !confirmPassword) {
        setAlert({
          open: true,
          message: "Please fill all the Fields",
          type: "error",
        });
        return;
      }
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
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
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
    addDoc(userRef, {
      name: name,
      email: email,
      password: hashMessage(password),
      confirmPassword: hashMessage(confirmPassword),
    });
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
        type="textarea"
        label="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        variant="outlined"
        type="email"
        label="Enter Email Id"
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
        style={{ backgroundColor: "orange" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
// Made with ♥ by Harsh Parakh