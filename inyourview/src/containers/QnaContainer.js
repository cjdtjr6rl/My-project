import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Qna from "../components/qna/qna";
import QnaAddForm from "../components/qna_add_form/qna_add_form";
import { addQna } from "../modules/qnas";

export function QnaAddContainer() {
  const user = useSelector((state) => state.login);
  const qna = useSelector((state) => state.qnas);
  const dispatch = useDispatch();

  const onAdd = (qna) => dispatch(addQna(qna));

  return <QnaAddForm user={user} qnas={qna} onAdd={onAdd} />;
}

// export function QnaListContainer() {
//   const user = useSelector((state) => state.login);
//   const qna = useSelector((state) => state.qnas);

//   return <Qna user={user} qnas={qna} />;
// }
