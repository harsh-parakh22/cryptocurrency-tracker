import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid orange",
      borderRadius: 5,
      padding: 10,
      fontFamily: "Open Sans",
      cursor: "pointer",
      backgroundColor: selected ? "orange" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "orange",
        color: "black",
      },
      width : "23%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
// Made with ♥ by Harsh Parakh