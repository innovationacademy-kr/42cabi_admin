import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Status from "./Pages/Status";
import Search from "./Pages/Search";
import PageNotFound from "./Pages/PageNotFound";
import Layout from "./Components/Layout";
import SearchDashboard from "./Pages/SearchDashboard";
import NoResult from "./Pages/NoResult";

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
            <Route path="noResult" element={<NoResult />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
