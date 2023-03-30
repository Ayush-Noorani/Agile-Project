import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Routes } from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./css/common.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ToastContextProvider } from "./context/ToastContext";
import { ProjectContextProvider } from "./context/ProjectContext";
function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ProjectContextProvider>
          <ToastContextProvider>
            <RouterProvider router={Routes} />
          </ToastContextProvider>
        </ProjectContextProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
