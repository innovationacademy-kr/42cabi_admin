import {
  Container,
  Overlay,
  Contents,
  Title,
  Close,
  Body,
  ConfirmButton,
  CancleButton,
} from "./ModalStyleComponent";
import * as API from "../Networks/APIType";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { GetExpiredResponse } from "../ReduxModules/StatusExpired";

const ReturnModal = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, state, close, originPage } = props;

  const CabinetInfo =
    data !== undefined
      ? data.floor?.toString() +
        "F " +
        data.section?.toString() +
        " " +
        data.cabinet_num?.toString() +
        "번"
      : "";

  const ReturnAPI = async () => {
    try {
      const cabinetIdx = data !== undefined ? data.cabinet_id : "";
      const urlReturn = "/api/return?cabinetIdx=" + cabinetIdx;
      const token = localStorage.getItem("accessToken");
      await API.axiosFormat(
        {
          method: "PATCH",
          url: API.url(urlReturn),
        },
        token
      );
      const params = {
        intraId: data !== undefined ? data.intra_id : "",
      };
      const resSearch = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/search"),
          params,
        },
        token
      );
      dispatch(GetTargetResponse(resSearch.data));
      if (originPage === "status") {
        const resExpired = await API.axiosFormat(
          {
            method: "GET",
            url: API.url("/api/lent/overdue"),
          },
          token
        );
        dispatch(GetExpiredResponse(resExpired.data));
      }
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    } finally {
      close(true);
    }
  };

  return state ? (
    <Container>
      <Overlay onClick={() => close(false)} />
      <Contents>
        <Title>
          사물함 반납 처리
          <Close onClick={() => close(false)}>✖︎</Close>
        </Title>
        <Body>
          <p>{CabinetInfo}</p>
          <p>해당 사물함을 정말 반납하시겠습니까?</p>
          <CancleButton onClick={() => close(false)}>취소</CancleButton>
          <ConfirmButton onClick={ReturnAPI}>반납</ConfirmButton>
        </Body>
      </Contents>
    </Container>
  ) : (
    <></>
  );
};

export default ReturnModal;
