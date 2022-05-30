import { ExpiredTable } from "../Tables/ExpiredTable";
import { DisabledTable } from "../Tables/DisabledTable";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GetExpiredResponse } from "../ReduxModules/StatusExpired";
import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import { useEffect } from "react";
import {
  DashboardBox,
  GrayBgBox,
  LeftBox,
  RightBox,
} from "../Components/DashboardStyleComponent";

const Status = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlExpired = "http://localhost:8080/api/lent/overdue";
    const urlDisabled = "http://localhost:8080/api/activation";

    const requestExpired = axios.get(urlExpired);
    const requestDisabled = axios.get(urlDisabled);

    axios
      .all([requestExpired, requestDisabled])
      .then(
        axios.spread((...responses) => {
          const responseExpired = responses[0];
          const responseDisabled = responses[1];
          dispatch(GetExpiredResponse(responseExpired.data));
          dispatch(GetDisabledResponse(responseDisabled.data));
        })
      )
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <GrayBgBox>
            <ExpiredTable />
          </GrayBgBox>
        </LeftBox>
        <RightBox>
          <GrayBgBox>
            <DisabledTable />
          </GrayBgBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

export default Status;
