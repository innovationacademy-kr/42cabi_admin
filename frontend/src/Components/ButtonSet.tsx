import CabiButton from "./CabiButton";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import axios from "axios";

const ButtonSet = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const isLent: boolean =
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent.length !== 0 &&
    SearchResponseRedux.resultFromLent[0].intra_id !== null;
  const isExist: boolean = SearchResponseRedux.resultFromLent?.length !== 0;

  const ReturnAPI = () => {
    // const SearchResponseRedux = useSelector(
    //   (state: RootState) => state.SearchResponse,
    //   shallowEqual
    // );
    const url = "http://localhost:2424/api/return";
    const lent_id =
      SearchResponseRedux.resultFromLent !== undefined
        ? SearchResponseRedux.resultFromLent[0].lent_id
        : 0;
    axios
      .post(url, { lent_id: lent_id })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ActivationAPI = () => {
    // const SearchResponseRedux = useSelector(
    //   (state: RootState) => state.SearchResponse,
    //   shallowEqual
    // );
    const url = "http://localhost:8080/api/activation";
    const cabinet_id =
      SearchResponseRedux.resultFromLent !== undefined
        ? SearchResponseRedux.resultFromLent[0].cabinet_id
        : 0;
    const activation =
      SearchResponseRedux.resultFromLent !== undefined
        ? SearchResponseRedux.resultFromLent[0].activation
        : 0;
    axios
      .post(url, { cabinetIdx: cabinet_id, activation: 0 })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <CabiButton Color="#6667ab" disabled={!isLent} onClick={ReturnAPI}>
        반납하기
      </CabiButton>
      {/* <CabiButton Color="#6667ab" disabled={isLent}>
        연장처리
      </CabiButton> */}
      <CabiButton Color="#6667ab" disabled={!isExist} onClick={ActivationAPI}>
        상태관리
      </CabiButton>
      {/* <CabiButton Color="#6667ab" disabled={true}>
        슬랙 메시지 전송
      </CabiButton> */}
    </div>
  );
};

export default ButtonSet;
