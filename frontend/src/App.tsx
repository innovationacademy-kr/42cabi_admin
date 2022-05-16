import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Home from "./Pages/Home";
import Status from "./Pages/Status";
import Search from "./Pages/Search";
import Map from "./Pages/Map";
import Layout from "./Components/Layout";
import CabinetInfo from "./Pages/CabinetInfo";
import SearchDashboard from "./Pages/SearchDashboard";
import NoResult from "./Pages/NoResult";

const App = () => {
  const PrivateRoute = () => {
    const isHavePrevState: boolean =
      localStorage.getItem("reduxPrevState") !== null;
    return isHavePrevState ? (
      <SearchDashboard />
    ) : (
      <Navigate to="/saerom/search/" />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="saerom" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="status" element={<Status />} />
          <Route path="search" element={<Search />}>
            <Route path="cabinet" element={<CabinetInfo />} />
            {/* <Route
              path="searchDashboard"
              element={
                isHavePrevState ? (
                  <SearchDashboard />
                ) : (
                  <Navigate to="/saerom/search/" />
                )
              }
            /> */}
            <Route path="searchDashboard" element={<PrivateRoute />} />
            <Route path="noResult" element={<NoResult />} />
          </Route>
          <Route path="map" element={<Map />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
