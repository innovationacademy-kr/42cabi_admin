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
import * as API from "../Networks/APIType";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";

const ActivationModal = (props: any) => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // const DisabledReason = () => {
  //   return isActivate ? <div></div> : <DisabledReasonBox />;
  // };

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
  const ActivationAPI = async (activation: number, noChange: boolean) => {
    try {
      const token = localStorage.getItem("accessToken");
      const cabinet_id = data !== undefined ? data.cabinet_id : "";
      if (noChange) {
        close(false);
      } else {
        await API.axiosFormat(
          {
            method: "PATCH",
            url: API.url("/api/activation"),
            data: {
              cabinetIdx: cabinet_id,
              activation: activation,
              reason: reasonText.current?.value,
            },
          },
          token
        );
        let params = {};
        if (searchParams.get("floor") !== null) {
          params = {
            floor: searchParams.get("floor"),
            cabinetNum: searchParams.get("cabinetNum"),
          };
        } else {
          params = {
            intraId: searchParams.get("intraId"),
          };
        }
        const res = await API.axiosFormat(
          {
            method: "GET",
            url: API.url("/api/search"),
            params,
          },
          token
        );
        dispatch(GetTargetResponse(res.data));
      }
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 401) {
        navigate("/");
      }
    } finally {
      close(true);
    }
  };

  return state ? (
    <Container>
      <Overlay onClick={() => close(false)} />
      <Contents>
        <Title>
          사물함 상태 관리
          <Close onClick={() => close(false)}>✖︎</Close>
        </Title>
        <Body>
          <p>{CabinetInfo}</p>
          <p>현재 상태 : {activation ? "사용 가능" : "사용 불가"}</p>
          <ToggleBox>
            상태 변경 :
            <ToggleBtn onClick={ClickedToggle} toggle={isActivate}>
              <Circle toggle={isActivate} />
            </ToggleBtn>
          </ToggleBox>
          <DisabledReasonBox
            isActivate={isActivate}
            type="text"
            placeholder="사용하지 못하는 이유를 적어주세요!"
            ref={reasonText}
          />
          <CancleButton onClick={() => close(false)}>취소</CancleButton>
          <ConfirmButton
            onClick={() => ActivationAPI(isActivate, activation === isActivate)}
          >
            저장
          </ConfirmButton>
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
  margin-bottom: 0;
`;

const DisabledReasonBox = styled.input<{
  isActivate: number;
}>`
  display: block;
  visibility: ${(props) => (props.isActivate === 0 ? "visible" : "hidden")};
  width: 25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: ${(props) => (props.isActivate === 0 ? "3rem" : 0)};
  transition: height 0.4s linear;
  transform-origin: top center;
`;

export default ActivationModal;
