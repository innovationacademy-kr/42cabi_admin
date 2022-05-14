// import {} from "react-redux";

import styled from "styled-components";

const Detail = () => {
  return (
    <div>
      <DetailBox>
        <p>사물함 정보 (2F Oasis 49)</p>
        <p>대여 정보 (2022.05.05 ~ 2022.05.06)</p>
        <p>고장 정보 (배터리 교체 필요)</p>
        <p>사용자 인트라 아이디 (jaesjeon)</p>
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

export default Detail;
