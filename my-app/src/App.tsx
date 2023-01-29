import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Routes } from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./css/common.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={Routes} />
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
