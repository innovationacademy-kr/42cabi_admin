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
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/hook";
// import { GetTargetResponse } from "../ReduxModules/SearchResponse";
// import { GetExpiredResponse } from "../ReduxModules/StatusExpired";
import { GetTargetResponse } from "../../src/redux/slices/searchResponseSlice";
import { GetExpiredResponse } from "../../src/redux/slices/statusExpiredSlice";
import { SearchQueryBody } from "../type";

const ReturnModal = (props: any) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

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

  const UpdateInfo = async (params: SearchQueryBody) => {
    try {
      const token = localStorage.getItem("accessToken");
      const resSearch = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/search"),
          params,
        },
        token
      );
      dispatch(GetTargetResponse(resSearch.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    } finally {
      close(true);
    }
  };

  const ReturnAPI = async () => {
    try {
      const cabinetIdx = data !== undefined ? data.cabinet_id : "";
      const urlReturn = "/api/v3/return/cabinet/" + cabinetIdx;
      const token = localStorage.getItem("accessToken");
      let params: SearchQueryBody;
      await API.axiosFormat(
        {
          method: "DELETE",
          url: API.url(urlReturn),
        },
        token
      );
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
      if (searchParams.get("intraId") !== null) {
        params = {
          intraId: data !== undefined ? data.intra_id : "",
        };
      } else {
        params = {
          cabinetNum: data !== undefined ? data.cabinet_num : "",
          floor: data !== undefined ? data.floor : "",
        };
      }
      UpdateInfo(params);
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
