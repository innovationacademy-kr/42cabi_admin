import { Outlet } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

const Search = () => {
  return (
    <div>
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default Search;
