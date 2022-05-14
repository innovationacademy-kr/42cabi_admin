import { Outlet } from "react-router-dom";
import { CabinetTable } from "../Tables/CabinetTable";
import { MiniTable } from "../Tables/MiniTable";

const CabinetInfo = () => {
  return (
    <div>
      {/* <CabinetTable /> */}
      <MiniTable />
    </div>
  );
};

export default CabinetInfo;
