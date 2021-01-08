import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Qna from "../components/qna/qna";
import QnaAddForm from "../components/qna_add_form/qna_add_form";
import QnaDetail from "../components/qna_detail/qna_detail";
import QnaEditForm from "../components/qna_edit_form/qna_edit_form";
import { addQna, delQna } from "../modules/qnas";

// export function QnaListContainer() {
//   const user = useSelector((state) => state.login);
//   const qna = useSelector((state) => state.qnas);

//   return <Qna user={user} qnas={qna} />;
// }

export function QnaAddContainer() {
  const user = useSelector((state) => state.login);
  const qna = useSelector((state) => state.qnas);
  const dispatch = useDispatch();

  const onAdd = (qna) => dispatch(addQna(qna));

  return <QnaAddForm user={user} qnas={qna} onAdd={onAdd} />;
}

export function QnaDelContainer() {
  const user = useSelector((state) => state.login);
  const qna = useSelector((state) => state.qnas);
  const dispatch = useDispatch();

  const onDel = (id) => dispatch(delQna(id));

  return <QnaDetail user={user} qnas={qna} onDel={onDel} />;
}

export function QnaEditContainer() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onEdit = (qna) => dispatch(addQna(qna));

  return <QnaEditForm user={user} onEdit={onEdit} />;
}
