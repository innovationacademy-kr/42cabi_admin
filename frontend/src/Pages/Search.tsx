import { Outlet } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import styled from "styled-components";

const Search = () => {
  return (
    <div>
      <SearchBar />
      <Outlet />
    </div>
  );
};

const SearchBarBox = styled.div`
  position: relative;
  z-index: 2;
`;
const OutletBox = styled.div`
  position: relative;
  z-index: 1;
`;

export default Search;
