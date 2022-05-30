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
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";

const ReturnModal = (props: any) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { data, state, close } = props;

  const CabinetInfo =
    data !== undefined
      ? data.floor?.toString() +
        "F " +
        data.section?.toString() +
        " " +
        data.cabinet_num?.toString() +
        "번"
      : "";

  const ReturnAPI = () => {
    const params = data !== undefined ? data.cabinet_id : "";
    const urlReturn = "http://localhost:8080/api/return?cabinetIdx=" + params;
    const urlUpdate = "http://localhost:8080/api/search";
    axios
      .patch(urlReturn, { params })
      .then((res) => {
        console.log(res);
        const params = {
          intraId: searchParams.get("intraId"),
        };
        axios
          .get(urlUpdate, { params })
          .then((res) => {
            // console.log(res);
            dispatch(GetTargetResponse(res.data));
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => close(true));
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
