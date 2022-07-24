import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
// material-ui
import { ThemeProvider } from "@mui/styles";
// theme
import theme from "./theme/default";
// global styles
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
