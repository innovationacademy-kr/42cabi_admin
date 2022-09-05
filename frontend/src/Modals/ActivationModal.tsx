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
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { GetBanCabinetResponse } from "../ReduxModules/TaskBanCabinet";

const ActivationModal = (props: any) => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, state, close } = props;
  const [isActivate, setIsActivate] = useState(1);
  const [activation, setActivation] = useState(1);
  const [isUpdated, setIsUpdated] = useState(false);

  const InitializeModalProps = useCallback(() => {
    if (
      SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent.length !== 0
    ) {
      setIsActivate(
        SearchResponseRedux.resultFromLent[0].activation === 1 ? 1 : 0
      );
      setActivation(
        SearchResponseRedux.resultFromLent[0].activation === 1 ? 1 : 0
      );
    }
  }, [SearchResponseRedux.resultFromLent]);

  useEffect(() => {
    InitializeModalProps();
  }, [InitializeModalProps]);

  const CloseModalWithNoChange = () => {
    InitializeModalProps();
    close(false);
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

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      ActivationAPI(isActivate, activation !== isActivate);
    }
  };

  const reasonText = useRef<HTMLInputElement>(null);
  const ActivationAPI = async (isActivate: number, isChanged: boolean) => {
    try {
      const token = localStorage.getItem("accessToken");
      const cabinet_id = data !== undefined ? data.cabinet_id : "";
      if (!isChanged) {
        close(false);
      } else {
        await API.axiosFormat(
          {
            method: "PATCH",
            url: API.url("/api/activation"),
            data: {
              cabinetIdx: cabinet_id,
              activation: isActivate,
              reason: reasonText.current?.value,
            },
          },
          token
        );
        let params = {};
        if (data.floor !== undefined) {
          params = {
            floor: data.floor,
            cabinetNum: data.cabinet_num,
          };
        } else {
          params = {
            intraId: data.intra_id,
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
        setIsUpdated(!isUpdated);
        close(true);
      }
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  };

  const GetBanCabinetData = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const banCabinetInfo = await API.axiosFormat(
      {
        method: "GET",
        url: API.url("/api/activation/ban"),
      },
      token
    );
    dispatch(GetBanCabinetResponse(banCabinetInfo.data));
  }, [dispatch]);

  useEffect(() => {
    if (window.location.pathname === "/saerom/task") {
      GetBanCabinetData();
    }
  }, [isUpdated, GetBanCabinetData]);

  return state ? (
    <Container>
      <Overlay onClick={() => CloseModalWithNoChange()} />
      <Contents>
        <Title>
          사물함 상태 관리
          <Close onClick={() => CloseModalWithNoChange()}>✖︎</Close>
        </Title>
        <Body>
          <p>{CabinetInfo}</p>
          <p>현재 상태 : {activation === 1 ? "사용 가능" : "사용 불가"}</p>
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
            onKeyPress={handleEnterKey}
          />
          <CancleButton onClick={() => CloseModalWithNoChange()}>
            취소
          </CancleButton>
          <ConfirmButton
            onClick={() => ActivationAPI(isActivate, activation !== isActivate)}
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
