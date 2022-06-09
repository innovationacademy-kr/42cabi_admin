import styled from "styled-components";
import { useState, useRef } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownHeaderSymbol,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./DropdownStyleComponent";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

const options = ["ID", "2F", "4F", "5F"];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState("ID");
  const [currentParams] = useSearchParams();

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const searchType = useRef<HTMLInputElement>(null);
  const searchText = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const goToResultPage = () => {
    setIsOpen(false);
    if (selectedOption === "ID") {
      const inputId = searchText.current?.value || "";
      if (currentParams.get("intraId") === inputId) {
        window.location.reload();
      } else {
        navigate({
          pathname: "/saerom/search/searchDashboard",
          search: createSearchParams({
            intraId: inputId,
          }).toString(),
        });
      }
    } else {
      const inputFloor = selectedOption.toString().split("F")[0];
      const inputCabinetNum = searchText.current?.value || "";
      if (
        currentParams.get("floor") === inputFloor &&
        currentParams.get("cabinetNum") === inputCabinetNum
      ) {
        window.location.reload();
      } else {
        navigate({
          pathname: "/saerom/search/searchDashboard",
          search: createSearchParams({
            floor: inputFloor,
            cabinetNum: inputCabinetNum,
          }).toString(),
        });
      }
    }
    if (searchText.current !== null) {
      searchText.current.value = "";
    }
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      goToResultPage();
    }
  };
  return (
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
      <SearchInput ref={searchText} onKeyDown={handleEnterKey} />
      <SearchButton onClick={goToResultPage}>검색</SearchButton>
    </SearchBarContainer>
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
  min-width: 7rem;
  height: 3rem;
  /* justify-content: flex-center; */
`;

const SearchButton = styled.button`
  margin-top: 1rem;
  margin-left: 1%;
  margin-right: 5%;
  width: 8rem;
  min-width: 5rem;
  height: 3.5rem;
  :active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
`;

export default SearchBar;
