import QnaRepository from "../service/qna_repository";

const ADD_QNA = "qnas/ADD_QNA";
const DEL_QNA = "qnas/DEL_QNA";

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

let initialState = {};

qnaRepository.syncQna((qnas) => {
  Object.assign(initialState, qnas);
});

export default function qnas(state = initialState, action) {
  switch (action.type) {
    case ADD_QNA:
      return qnaRepository.saveQna(action.qna);
    case DEL_QNA:
      return qnaRepository.removeQna(action.id);
    default:
      return state;
  }
}
