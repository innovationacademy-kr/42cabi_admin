import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Home from "./Pages/Home";
import Status from "./Pages/Status";
import Search from "./Pages/Search";
import Map from "./Pages/Map";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/serom" element={<Home />}></Route>
        <Route path="/serom/status" element={<Status />}></Route>
        <Route path="/serom/search" element={<Search />}></Route>
        <Route path="/serom/map" element={<Map />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
