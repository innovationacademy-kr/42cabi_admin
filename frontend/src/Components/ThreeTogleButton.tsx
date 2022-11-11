import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface buttonProps {
  handleClick: (
    selectedCabinetType: string,
    index: number,
    length: number
  ) => void;
}

export default function ThreeToggleButton({ handleClick }: buttonProps) {
  const [selectedCabinetType, setSelectedCabinetType] = React.useState("all");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedType: string
  ) => {
    console.log(newSelectedType);
    handleClick(newSelectedType, 0, 10);
    setSelectedCabinetType(newSelectedType);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedCabinetType}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ marginTop: "5", fontSize: "1.2rem" }}
    >
      <ToggleButton value="PRIVATE">개인</ToggleButton>
      <ToggleButton value="SHARE">공유</ToggleButton>
      <ToggleButton value="CIRCLE">동아리</ToggleButton>
    </ToggleButtonGroup>
  );
}
