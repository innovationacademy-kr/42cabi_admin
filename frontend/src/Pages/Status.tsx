import { ExpiredTable } from "../Tables/ExpiredTable";
import { DisabledTable } from "../Tables/DisabledTable";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GetExpiredResponse } from "../ReduxModules/StatusExpired";
import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import { useEffect } from "react";
import styled from "styled-components";

const Status = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlExpired = "http://localhost:8080/api/lent/overdue";
    const urlDisabled = "http://localhost:8080/api/activation";
    const token = localStorage.getItem("accessToken");

    const requestExpired = axios.get(urlExpired, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const requestDisabled = axios.get(urlDisabled, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
          <TableBox>
            <ExpiredTable />
          </TableBox>
        </LeftBox>
        <RightBox>
          <TableBox>
            <DisabledTable />
          </TableBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

const DashboardBox = styled.div`
  display: flex;
  width: 99%;
  height: 90%;
  // border: 0.5rem solid #6667ab;
`;

const TableBox = styled.div`
  margin: 0.2rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1.5rem;
  // border: 0.2rem solid green;
  background-color: #dddddd;
`;

const LeftBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid red;
`;

const RightBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid blue;
`;

export default Status;
