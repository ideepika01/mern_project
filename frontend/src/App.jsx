import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App-Wrapper">
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;