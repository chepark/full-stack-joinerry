import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: teal.A100,
      main: "#34CC99",
      dark: teal.A700,
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderTop: "1px solid #ccc",
          borderLeft: "1px solid #ccc",
          borderRight: "1px solid #ccc",
        },
      },
    },
  },
});

export default theme;
