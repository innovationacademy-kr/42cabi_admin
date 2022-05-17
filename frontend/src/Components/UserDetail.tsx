import { useSelector } from "react-redux";
import { useMemo } from "react";
import styled from "styled-components";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";

const UserDetail = () => {
  const SearchUserRedux = useSelector((state: RootState) => state.SearchUser);
  const data = useMemo(
    () => SearchUserRedux.data?.resultFromLent,
    [SearchUserRedux.data?.resultFromLent]
  );

  const UserInfo =
    data !== undefined && data.length !== 0 ? data[0].intra_id : "정보 없음";

  const UserCabinetInfo =
    data !== undefined && data.length !== 0
      ? data[0].location?.toString() +
        " " +
        data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "정보 없음";

  const UserLentInfo =
    data !== undefined && data.length !== 0
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].return_time?.toString()).format("YYYY.MM.DD")
      : "정보 없음";

  return (
    <div>
      <DetailBox>
        <BigFontSize>{UserInfo}</BigFontSize>
        <p>대여 중인 사물함 : {UserCabinetInfo}</p>
        <p>대여기간 : {UserLentInfo}</p>
      </DetailBox>
    </div>
  );
};

const DetailBox = styled.div`
  display: inline-block;
  text-align: center;
  width: 85%;
  border: 0.5rem solid black;
  margin: 1rem;
  padding: 1rem;
`;

const BigFontSize = styled.p`
  margin-top: 2rem;
  font-size: 3rem;
`;

export default UserDetail;
