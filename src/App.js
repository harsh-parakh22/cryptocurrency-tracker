import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";
import Alert from "./Components/Alert";
import CoinTable from "./Components/CoinTable";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import Dashboard from "./Pages/Dashboard";
import Features from "./Components/Features";
import About from "./Components/About";
import Contact from "./Components/Contact";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#252930",
    color: "white",
    minHeight : "100vh",
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Route path="/" component={HomePage} exact />
        <Route path="feature" component={Features} exact />
        <Route path="/feature/cointable" component={CoinTable} exact />
        <Route path="/feature/coin/:id" component={CoinPage} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/forgotPassword" component={ForgotPassword} exact />
        <Route path="/changePassword" component={ChangePassword} exact />
        <Route path="/adminDashboard" component={Dashboard} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
// Made with ♥ by Harsh Parakh