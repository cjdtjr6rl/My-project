import React, { useEffect, useRef, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./qna_add_form.module.css";
import Button from "../button/button";
import { useHistory } from "react-router-dom";
import moment from "moment";
import CryptoJS from "crypto-js";

function QnaAddForm({ qnaRepository }) {
  const history = useHistory();
  const [qnas, setQnas] = useState({});

  useEffect(() => {
    const stopSync = qnaRepository.syncQna((qnas) => {
      setQnas(qnas);
    });
    return () => stopSync();
  }, [qnaRepository]);
  const number = Object.keys(qnas).length + 1;

  const formRef = useRef();
  const titleRef = useRef();
  const nameRef = useRef();
  const contentRef = useRef();
  const pwdRef = useRef();

  const [hidden, setHid] = useState("");

  const onChange = function (e) {
    setHid(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const date = Date.now();
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(pwdRef.current.value),
      "secret-key-1"
    ).toString();
    const qna = {
      id: date,
      index: number,
      name: nameRef.current.value || "",
      title: titleRef.current.value || "",
      content: contentRef.current.value || "",
      date: moment(date).format("yyyy-MM-DD"),
      password: encrypt || "",
      secret: hidden,
    };

    formRef.current.reset();
    qnaRepository.saveQna(qna);
    history.push("/qna");
  };

  const goBack = function () {
    history.push("/qna");
  };

  return (
    <section className={styles.qnaadd}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>QnA</h3>
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
              <tr className={styles.tr}>
                <th className={styles.th}>비밀글설정</th>
                <td
                  className={`${styles.td} ${styles.radio}`}
                  onChange={onChange}
                >
                  <input type="radio" name="secret" value="common" />
                  공개글&nbsp;
                  <input type="radio" name="secret" value="secret" />
                  비밀글
                </td>
              </tr>
            </tbody>
          </table>
          <Button name="등록" onClick={onSubmit} />
          &nbsp;
          <Button name="취소" onClick={goBack} />
        </form>
        <Footer />
      </article>
    </section>
  );
}

export default QnaAddForm;
