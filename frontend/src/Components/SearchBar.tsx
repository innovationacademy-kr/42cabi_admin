import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownHeaderSymbol,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./Dropdown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetTargetCabinet } from "../ReduxModules/SearchCabinet";
import { GetTargetUser } from "../ReduxModules/SearchUser";
import { GetTargetType } from "../ReduxModules/SearchType";

//for test
// import MINI_DATA from "../Tables/MINI_DATA.json";
// import MINI_DATA2 from "../Tables/MINI_DATA2.json";
import RESPONSE_BY_CABINET from "../Tables/RESPONSE_BY_CABINET.json";
import RESPONSE_BY_ID from "../Tables/RESPONSE_BY_ID.json";

const options = ["ID", "2F", "4F", "5F"];

const SearchBar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState("ID");

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const searchType = useRef<HTMLInputElement>(null);
  const searchText = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const searchAPI = () => {
    let params = {};
    //for test
    if (selectedOption === "ID") {
      dispatch(GetTargetUser(RESPONSE_BY_ID));
      dispatch(GetTargetType("User"));
    } else {
      dispatch(GetTargetCabinet(RESPONSE_BY_CABINET));
      dispatch(GetTargetType("Cabinet"));
    }
    // localStorage.setItem("reduxPrevState", JSON.stringify(SearchCabinetRedux));

    if (selectedOption === "ID") {
      params = {
        intraId: searchText.current?.value,
      };
    } else {
      params = {
        floor: selectedOption,
        cabinetNum: searchText.current?.value,
      };
    }
    const url = `http://localhost:8080/api/search/`;
    console.log(params, url);
    axios
      .get(url, { params })
      .then((res) => {
        dispatch(GetTargetCabinet(res.data));
        console.log(res);
        navigate("/saerom/search/searchDashboard");
      })
      .catch((e) => {
        navigate("/saerom/search/searchDashboard"); // for test
        // navigate("/saerom/search/noResult");
        console.log(e);
      });
  };

  return (
    <div className="SearchBar">
      <SearchBarContainer>
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {selectedOption}
            <DropDownHeaderSymbol>▼</DropDownHeaderSymbol>
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {options.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                    ref={searchType}
                  >
                    {option}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
        <SearchInput ref={searchText} />
        <SearchButton onClick={searchAPI}>검색</SearchButton>
      </SearchBarContainer>
    </div>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const SearchInput = styled.input`
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: right;
  width: 23rem;
  height: 3rem;
  justifycontent: flex-center;
`;

const SearchButton = styled.button`
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 8rem;
  height: 3.5rem;
`;

export default SearchBar;
