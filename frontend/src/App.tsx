import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Home from "./Pages/Home";
import Status from "./Pages/Status";
import Search from "./Pages/Search";
import Layout from "./Components/Layout";
import SearchDashboard from "./Pages/SearchDashboard";
import InvalidCabinet from "./Pages/InvalidCabinet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="saerom" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="status" element={<Status />} />
          <Route path="search" element={<Search />}>
            <Route path="searchDashboard" element={<SearchDashboard />} />
            <Route path="invalidCabinet" element={<InvalidCabinet />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
