import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Task from "./Pages/Task";
import Status from "./Pages/Status";
import Search from "./Pages/Search";
import PageNotFound from "./Pages/PageNotFound";
import Layout from "./Components/Layout";
import SearchDashboard from "./Pages/SearchDashboard";
import Footer from "./Components/Footer";
import InvalidSearchResult from "./Pages/InvalidSearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="saerom" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="task" element={<Task />} />
          {/* <Route path="status" element={<Status />} /> */}
          <Route path="search" element={<Search />}>
            <Route path="searchDashboard" element={<SearchDashboard />} />
            <Route
              path="invalidSearchResult"
              element={<InvalidSearchResult />}
            />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
