import styled from "styled-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownHeaderSymbol,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./Dropdown";
import axios from "axios";

const options = ["ID", "2F", "4F", "5F"];

const SearchBar = () => {
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

  const searchAPI = () => {
    let params = {};
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
        console.log(res);
      })
      .catch((e) => {
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
        <Link to="searchDashboard">
          <SearchButton onClick={searchAPI}>검색</SearchButton>
        </Link>
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
