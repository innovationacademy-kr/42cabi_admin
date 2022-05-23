import {
  Container,
  Overlay,
  Contents,
  Title,
  Close,
  Body,
  ConfirmButton,
  CancleButton,
  ToggleBtn,
  Circle,
} from "./ModalStyleComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";

const ActivationModal = (props: any) => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { data, state, close } = props;
  const [isActivate, setIsActivate] = useState(1);
  const [activation, setActivation] = useState(1);

  useEffect(() => {
    if (
      SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent.length !== 0
    ) {
      setIsActivate(
        SearchResponseRedux.resultFromLent[0].activation === 0 ? 0 : 1
      );
      setActivation(
        SearchResponseRedux.resultFromLent[0].activation === 0 ? 0 : 1
      );
    }
  }, [SearchResponseRedux.resultFromLent]);

  const DisabledReason = () => {
    return isActivate ? (
      <div></div>
    ) : (
      <DisabledReasonBox
        type="text"
        placeholder="비활성화 이유를 입력해주세요"
        show={1}
        ref={reasonText}
      />
    );
  };

  const CabinetInfo =
    data !== undefined
      ? data.floor?.toString() +
        "F " +
        data.section?.toString() +
        " " +
        data.cabinet_num?.toString() +
        "번"
      : "";

  const ClickedToggle = () => {
    setIsActivate((prev: number) => Number(!prev));
  };

  const reasonText = useRef<HTMLInputElement>(null);
  const ActivationAPI = (activation: number) => {
    const urlActivation = "http://localhost:8080/api/activation";
    const urlUpdate = "http://localhost:8080/api/search";
    const cabinet_id = data !== undefined ? data.cabinet_id : "";
    axios
      .post(urlActivation, {
        cabinetIdx: cabinet_id,
        activation: activation,
        reason: reasonText.current?.value,
      })
      .then((res) => {
        console.log(res);
        const params = {
          floor: searchParams.get("floor"),
          cabinetNum: searchParams.get("cabinetNum"),
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
      .finally(() => {
        close();
      });
  };

  return state ? (
    <Container>
      <Overlay onClick={(event) => close(event)} />
      <Contents>
        <Title>
          사물함 상태 관리
          <Close onClick={(event) => close(event)}>X</Close>
        </Title>
        <Body>
          <p>{CabinetInfo}</p>
          <p>현재 상태 : {activation ? "활성화됨" : "비활성화됨"}</p>
          <ToggleBox>
            상태 변경 :
            <ToggleBtn onClick={ClickedToggle} toggle={isActivate}>
              <Circle toggle={isActivate} />
            </ToggleBtn>
          </ToggleBox>
          <DisabledReason />
          <p>
            <CancleButton onClick={(event) => close(event)}>취소</CancleButton>
            <ConfirmButton
              onClick={() => ActivationAPI(isActivate)}
              disabled={activation === isActivate}
            >
              저장
            </ConfirmButton>
          </p>
        </Body>
      </Contents>
    </Container>
  ) : (
    <></>
  );
};

const ToggleBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const DisabledReasonBox = styled.input<{
  show: number;
}>`
  width: 25rem;
  height: 3rem;
`;

export default ActivationModal;
