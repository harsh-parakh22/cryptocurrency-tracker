import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pagination } from "@material-ui/lab";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { CryptoState } from "../../../CryptoContext";

const AdminData = () => {
  const [adminData, setAdminData] = useState([]);
  const { loading } = CryptoState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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
    return adminData.filter(
      (user) => user.number.includes(search) || user.number.includes(search)
    );
  };

  useEffect(() => {
    const getAdmin = async () => {
      let list = [];
      try {
        const adminSnapshot = await getDocs(collection(db, "admins"));
        adminSnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setAdminData(list);
        // console.log(list)
      } catch (error) {
        console.error("Error getting admins:", error);
      }
    };
    getAdmin();
  }, []);

  console.log(adminData);

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
            label="Search For Admin's number"
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
                    {[
                      "Admin ID",
                      <div style={{ margin: "auto 150px auto 0" }}> Name </div>,
                      "Phone",
                    ].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontSize: "22px",
                          fontFamily: "Open Sans",
                        }}
                        key={head}
                        align={head === "Admin ID" ? "left" : "right"}
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
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            {user.id}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span style={{ color: "darkgrey" }}></span>
                            </div>
                          </TableCell>

                          <TableCell align="center">{user.names}</TableCell>
                          <TableCell align="right">{user.number}</TableCell>
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

export default AdminData;
// Made with ♥ by Harsh Parakh