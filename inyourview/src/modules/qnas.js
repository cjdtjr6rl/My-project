// import LoginRepository from "../service/login_repository";
import QnaRepository from "../service/qna_repository";

// const SET_QNA = "qnas/SET_QNA";
const ADD_QNA = "qnas/ADD_QNA";
const DEL_QNA = "qnas/DEL_QNA";

// const loginRepository = new LoginRepository();
const qnaRepository = new QnaRepository();

export const addQna = (qna) => ({
  type: ADD_QNA,
  qna: {
    qna,
  },
});

export const delQna = (id) => ({
  type: DEL_QNA,
  id,
});

const initialState = [];

const stopSync = qnaRepository.syncQna((qnas) => {
  let initialArray = initialState.concat(qnas);
  console.log(initialArray);
  return initialArray;
});

export default function qnas(state = stopSync, action) {
  switch (action.type) {
    case ADD_QNA:
      return state.saveQna(action.qna);
    case DEL_QNA:
      return state.removeQna(action.id);
    default:
      return state;
  }
}
