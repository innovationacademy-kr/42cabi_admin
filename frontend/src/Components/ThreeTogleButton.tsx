import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ThreeToggleButton() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ marginTop: "5" }}
    >
      <ToggleButton value="private">개인</ToggleButton>
      <ToggleButton value="share">공유</ToggleButton>
      <ToggleButton value="circle">동아리</ToggleButton>
    </ToggleButtonGroup>
  );
}
