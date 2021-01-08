import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeAddForm from "../components/notice_add_form/notice_add_form";
import NoticeDetail from "../components/notice_detail/notice_detail";
import NoticeEditForm from "../components/notice_edit_form/notice_edit_form";
import { addNotice, delNotice } from "../modules/notices";

// import Notice from "../components/notice/notice";

// export function NoticeListContainer() {
//   const user = useSelector((state) => state.login);
//   const notice = useSelector((state) => state.notices);

//   return <Notice user={user} noticess={notice} />;
// }

export function NoticeAddContainer() {
  const user = useSelector((state) => state.login);
  const notice = useSelector((state) => state.notices);
  const dispatch = useDispatch();

  const onAdd = (notice) => dispatch(addNotice(notice));

  return <NoticeAddForm user={user} notices={notice} onAdd={onAdd} />;
}

export function NoticeDelContainer() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onDel = (id) => dispatch(delNotice(id));

  return <NoticeDetail user={user} onDel={onDel} />;
}

export function NoticeEditContainer() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onEdit = (qna) => dispatch(addNotice(qna));

  return <NoticeEditForm user={user} onEdit={onEdit} />;
}
