import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import AdminAuthModal from "./Authentication/Admin/AdminAuthModal";
import { Link } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "orange",
    fontFamily: "Roboto Condensed",
    fontSize: "40px",
    fontWeight: "bold",
    marginLeft : -40,
    cursor: "pointer",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Open Sans",
    fontSize: "20px",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 25,
    marginRight : 10,
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { currency, setCurrency, user } = CryptoState();

  const history = useHistory();

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
      <AppBar color="default" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}
            >
              Crypto Creed
            </Typography>
            <div className={classes.links}>
              <p>
                <Link to="/" smooth={true} offset={1} duration={150}>
                  Home
                </Link>{" "}
              </p>{" "}
              &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <p>
                <Link to="features" smooth={true} offset={1} duration={170}>
                  Feature
                </Link>
              </p>{" "}
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
              <p>
                <Link to="about" smooth={true} offset={1} duration={150}>
                  About
                </Link>
              </p>{" "}
              &nbsp; &nbsp; &nbsp; &nbsp;
              <p>
                <Link to="contact" smooth={true} offset={1} duration={200}>
                  Contact
                </Link>
              </p>{" "}
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            </div>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width : 85, height : 40 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"JPY"}>JPY</MenuItem>
              <MenuItem value={"ZAR"}>ZAR</MenuItem>
            </Select>{" "}
            &nbsp; &nbsp;
            {user ? <UserSidebar /> : <AuthModal />} &nbsp; &nbsp;
            <AdminAuthModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
// Made with ♥ by Harsh Parakh