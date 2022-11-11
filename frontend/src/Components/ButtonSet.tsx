import CabiButton from "./CabiButton";
// import { useSelector, shallowEqual } from "react-redux";
// import { RootState } from "../ReduxModules/rootReducer";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";
import ReturnModal from "../Modals/ReturnModal";
import ActivationModal from "../Modals/ActivationModal";
import Toast from "./Toast";

const ButtonSet = (props: any) => {
  // const SearchResponseRedux = useSelector(
  //   (state: RootState) => state.SearchResponse,
  //   shallowEqual
  // );
  const SearchResponseRedux = useAppSelector((state) => state.searchResponse);

  const isLent: boolean =
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent.length !== 0 &&
    SearchResponseRedux.resultFromLent[0].lent_id !== null;
  const isExist: boolean =
    SearchResponseRedux.resultFromLent?.length !== 0 &&
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent[0].cabinet_id !== null;
  const isUser: boolean =
    SearchResponseRedux.resultFromLent?.length !== 0 &&
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent[0].intra_id !== null;

  const [showReturnModal, setShowReturnModal] = useState(false);
  const openReturnModal = () => {
    setShowReturnModal(true);
  };
  const closeReturnModal = (isChanged: boolean) => {
    setShowReturnModal(false);
    if (isChanged) {
      openChangeSuccessToast();
    } else {
      openChangeCancledToast();
    }
  };
  const [showActivationModal, setShowActivationModal] = useState(false);
  const openActivationModal = () => {
    setShowActivationModal(true);
  };
  const closeActivationModal = (isChanged: boolean) => {
    setShowActivationModal(false);
    if (isChanged) {
      openChangeSuccessToast();
    } else {
      openChangeCancledToast();
    }
  };

  const [copySuccessToast, setCopySuccessToast] = useState(false);
  const openCopySuccessToast = () => {
    setChangeSuccessToast(false);
    setChangeCancledToast(false);
    setCopySuccessToast(true);
    setTimeout(() => closeCopySuccessToast(), 1500);
  };
  const closeCopySuccessToast = () => {
    setCopySuccessToast(false);
  };

  const [changeSuccessToast, setChangeSuccessToast] = useState(false);
  const openChangeSuccessToast = () => {
    setCopySuccessToast(false);
    setChangeCancledToast(false);
    setChangeSuccessToast(true);
    setTimeout(() => closeChangeSuccessToast(), 1500);
  };
  const closeChangeSuccessToast = () => {
    setChangeSuccessToast(false);
  };
  const [changeCancledToast, setChangeCancledToast] = useState(false);
  const openChangeCancledToast = () => {
    setCopySuccessToast(false);
    setChangeSuccessToast(false);
    setChangeCancledToast(true);
    setTimeout(() => closeChangeCancledToast(), 1500);
  };
  const closeChangeCancledToast = () => {
    setChangeCancledToast(false);
  };

  const { originPage } = props;

  const HandleCopy = () => {
    const text =
      SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent[0].intra_id !== undefined
        ? SearchResponseRedux.resultFromLent[0].intra_id
        : "";
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          openCopySuccessToast();
        })
        .catch(() => {
          alert("다시 시도해주세요.");
        });
    } else {
      alert("복사하기가 지원되지 않는 브라우저입니다.");
    }
  };

  if (
    SearchResponseRedux.resultFromLent === undefined ||
    (SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent.length === 0)
  ) {
    return <></>;
  } else {
    return (
      <div>
        <CabiButton
          Color="#6667ab"
          disabled={!isLent}
          onClick={openReturnModal}
        >
          사물함 반납하기
        </CabiButton>
        <ReturnModal
          data={
            SearchResponseRedux.resultFromLent !== undefined
              ? SearchResponseRedux.resultFromLent[0]
              : []
          }
          state={showReturnModal}
          open={openReturnModal}
          close={closeReturnModal}
          originPage={originPage}
        />
        {/* <CabiButton Color="#6667ab" disabled={isLent}>
        연장처리
      </CabiButton> */}
        <CabiButton
          Color="#6667ab"
          disabled={!isExist}
          onClick={openActivationModal}
        >
          사물함 상태관리
        </CabiButton>
        <ActivationModal
          data={
            SearchResponseRedux.resultFromLent !== undefined
              ? SearchResponseRedux.resultFromLent[0]
              : []
          }
          activation={
            SearchResponseRedux.resultFromLent !== undefined &&
            SearchResponseRedux.resultFromLent[0] !== undefined
              ? SearchResponseRedux.resultFromLent[0].activation
              : 1
          }
          state={showActivationModal}
          open={openActivationModal}
          close={closeActivationModal}
        />
        <CabiButton Color="#6667ab" disabled={!isUser} onClick={HandleCopy}>
          인트라 ID 복사
        </CabiButton>
        <CabiButton Color="#6667ab" disabled={true}>
          슬랙 메시지 전송
        </CabiButton>
        <Toast
          state={copySuccessToast}
          close={closeCopySuccessToast}
          BgColor="#6667ab"
          messageColor="#ffffff"
          textMessage="인트라 ID가 정상적으로 복사되었습니다!"
        />
        <Toast
          state={changeSuccessToast}
          close={closeChangeSuccessToast}
          BgColor="#4ba155"
          messageColor="#ffffff"
          textMessage="변경 사항이 정상적으로 적용되었습니다!"
        />
        <Toast
          state={changeCancledToast}
          close={closeChangeCancledToast}
          BgColor="rgba(39, 43, 39, 0.65)"
          messageColor="#ffffff"
          textMessage="취소되었거나 변경사항이 없습니다!"
        />
      </div>
    );
  }
};

export default ButtonSet;
