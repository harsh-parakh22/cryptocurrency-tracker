import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ThemeProvider } from "@material-ui/styles";
import {
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { CryptoState } from "../../../CryptoContext";
import { Pagination } from "@material-ui/lab";
import { Search } from "@material-ui/icons";

const UserMessage = () => {
  const [userMessage, setUserMessage] = useState([]);
  const [search, setSearch] = useState("");
  const { loading } = CryptoState();
  const [page, setPage] = useState(1);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Open Sans",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "orange",
      },
    },
    paper: {
      margin: "auto 80px auto 10px",
      Width : "150px",
    },
  });

  const handleSearch = () => {
    return userMessage.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.name.toUpperCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.email.toUpperCase().includes(search)
    );
  };

  useEffect(() => {
    const getUserMessage = async () => {
      let list = [];
      try {
        const userMessageSnapshot = await getDocs(collection(db, "message"));
        userMessageSnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserMessage(list);
      } catch (error) {
        console.error("Error getting user Message:", error);
      }
    };
    getUserMessage();
  }, []);

  const handelDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "message", id));
      setUserMessage(userMessage.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
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

  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.paper}>
          <Search style={{ margin: "45px 20px auto 0" }} />
          <TextField
            label="Search For User's Name or Email"
            variant="outlined"
            style={{ marginBottom : 25, marginTop : 30, width : "95%" }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "orange" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "orange" }}>
                  <TableRow>
                    {["Name", "Email", "Message", "Action"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontSize: "22px",
                          fontFamily: "Open Sans",
                        }}
                        key={head}
                        align={head === "Name" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((user) => {
                      return (
                        <TableRow className={classes.row}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              gap: 15,
                            }}
                          >
                            {user.name}
                          </TableCell>

                          <TableCell align="right">{user.email}</TableCell>
                          <TableCell align="right">{user.message}</TableCell>
                          <TableCell align="right">
                            <Button
                              style={{ color: "orange" }}
                              onClick={() => handelDelete(user.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          <Pagination
            count={parseInt((handleSearch()?.length / 10).toFixed(0))}
            style={{
              padding: 20,
              width : "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(500, 0);
            }}
          />
        </div>
      </ThemeProvider>
    </>
  );
};

export default UserMessage;
// Made with ♥ by Harsh Parakh