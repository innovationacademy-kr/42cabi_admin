import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="saerom" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="status" element={<Status />} />
          <Route path="search" element={<Search />}>
            <Route path="cabinet" element={<CabinetInfo />} />
            <Route path="searchDashboard" element={<SearchDashboard />} />
          </Route>
          <Route path="map" element={<Map />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
