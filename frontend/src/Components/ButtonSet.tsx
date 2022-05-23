import CabiButton from "./CabiButton";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { useState, useEffect } from "react";
import ReturnModal from "../Modals/ReturnModal";
import ActivationModal from "../Modals/ActivationModal";

const ButtonSet = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const [isLoading, setIsLoading] = useState(true);

  const isLent: boolean =
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent.length !== 0 &&
    SearchResponseRedux.resultFromLent[0].lent_id !== null;
  const isExist: boolean =
    SearchResponseRedux.resultFromLent?.length !== 0 &&
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent[0].cabinet_id !== null;

  const [showReturnModal, setShowReturnModal] = useState(false);
  const openReturnModal = () => {
    setShowReturnModal(true);
  };
  const closeReturnModal = () => {
    setShowReturnModal(false);
  };
  const [showActivationModal, setShowActivationModal] = useState(false);
  const openActivationModal = () => {
    setShowActivationModal(true);
  };
  const closeActivationModal = () => {
    setShowActivationModal(false);
  };

  useEffect(() => {
    if (SearchResponseRedux.resultFromLent?.length !== 0) {
      setIsLoading(false);
    }
  }, [SearchResponseRedux.resultFromLent]);

  if (isLoading) {
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
          close={closeReturnModal}
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
          close={closeActivationModal}
        />
        <CabiButton Color="#6667ab" disabled={true}>
          슬랙 메시지 전송
        </CabiButton>
      </div>
    );
  }
};

export default ButtonSet;
