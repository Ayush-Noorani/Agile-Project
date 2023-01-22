import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Routes } from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SideBar } from "./components/SiderBar/Siderbar";
function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SideBar>
          <RouterProvider router={Routes} />
        </SideBar>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
