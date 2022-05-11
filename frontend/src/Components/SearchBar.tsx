import styled from "styled-components";
import { useState } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownHeaderSymbol,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./Dropdown";

const options = ["ID", "2F", "4F", "5F"];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState("");

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <div className="DropDownMenu">
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "ID"}
          <DropDownHeaderSymbol>▼</DropDownHeaderSymbol>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </div>
  );
};

export default SearchBar;
