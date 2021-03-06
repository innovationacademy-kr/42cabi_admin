import CabiButton from "./CabiButton";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { useState } from "react";
import ReturnModal from "../Modals/ReturnModal";
import ActivationModal from "../Modals/ActivationModal";
import Toast from "./Toast";

const ButtonSet = (props: any) => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );

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
          alert("?????? ??????????????????.");
        });
    } else {
      alert("??????????????? ???????????? ?????? ?????????????????????.");
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
          ????????? ????????????
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
        ????????????
      </CabiButton> */}
        <CabiButton
          Color="#6667ab"
          disabled={!isExist}
          onClick={openActivationModal}
        >
          ????????? ????????????
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
          ????????? ID ??????
        </CabiButton>
        <CabiButton Color="#6667ab" disabled={true}>
          ?????? ????????? ??????
        </CabiButton>
        <Toast
          state={copySuccessToast}
          close={closeCopySuccessToast}
          BgColor="#6667ab"
          messageColor="#ffffff"
          textMessage="????????? ID??? ??????????????? ?????????????????????!"
        />
        <Toast
          state={changeSuccessToast}
          close={closeChangeSuccessToast}
          BgColor="#4ba155"
          messageColor="#ffffff"
          textMessage="?????? ????????? ??????????????? ?????????????????????!"
        />
        <Toast
          state={changeCancledToast}
          close={closeChangeCancledToast}
          BgColor="rgba(39, 43, 39, 0.65)"
          messageColor="#ffffff"
          textMessage="?????????????????? ??????????????? ????????????!"
        />
      </div>
    );
  }
};

export default ButtonSet;
