import React, { useRef } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./notice_add_form.module.css";
import Button from "../button/button";
import { useHistory } from "react-router-dom";
import moment from "moment";
import CryptoJS from "crypto-js";

function NoticeAddForm({ user, notices, onAdd }) {
  const history = useHistory();

  const number = Object.keys(notices).length + 1;

  const formRef = useRef();
  const titleRef = useRef();
  const nameRef = useRef();
  const contentRef = useRef();
  const pwdRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const date = Date.now();
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(pwdRef.current.value),
      "secret-key-1"
    ).toString();
    const notice = {
      id: date,
      index: number,
      name: nameRef.current.value || "",
      title: titleRef.current.value || "",
      content: contentRef.current.value || "",
      date: moment(date).format("yyyy-MM-DD"),
      password: encrypt || "",
    };

    formRef.current.reset();
    onAdd(notice);
    history.push("/notice");
  };

  const goBack = function () {
    history.push("/notice");
  };

  return (
    <section className={styles.noticeadd}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>공지사항</h3>
        <form ref={formRef} className={styles.form}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>제목</th>
                <td className={styles.td}>
                  <input
                    ref={titleRef}
                    className={styles.input}
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요."
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>작성자</th>
                <td className={styles.td}>
                  <input
                    ref={nameRef}
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="이름을 입력하세요."
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>내용</th>
                <td className={styles.td}>
                  <textarea
                    ref={contentRef}
                    className={styles.textarea}
                    name="content"
                    placeholder="내용을 입력하세요."
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>비밀번호</th>
                <td className={styles.td}>
                  <input
                    ref={pwdRef}
                    className={styles.input}
                    type="password"
                    name="password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button name="등록" onClick={onSubmit} />
          &nbsp;
          <Button name="취소" onClick={goBack} />
        </form>
        <Footer users={user} />
      </article>
    </section>
  );
}

export default NoticeAddForm;
