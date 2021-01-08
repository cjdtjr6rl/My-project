import QnaRepository from "../service/qna_repository";

const ADD_QNA = "qnas/ADD_QNA";
const DEL_QNA = "qnas/DEL_QNA";

const qnaRepository = new QnaRepository();

export const addQna = (qna) => ({
  type: ADD_QNA,
  qna,
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
      const adding = qnaRepository.saveQna(action.qna);
      return {
        ...state,
        adding,
      };
    case DEL_QNA:
      const removing = qnaRepository.removeQna(action.id);
      return {
        ...state,
        removing,
      };
    default:
      return state;
  }
}
