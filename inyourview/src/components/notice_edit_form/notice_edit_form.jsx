import React, { useRef, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./notice_edit_form.module.css";
import Button from "../button/button";
import { useHistory, useLocation } from "react-router-dom";

function NoticeEditForm({ noticeRepository }) {
  const history = useHistory();
  const data = useLocation();
  const noticeData = data.state;
  const { id, title, name, content, password, date } = noticeData;

  const formRef = useRef();
  const titleRef = useRef();
  const nameRef = useRef();
  const contentRef = useRef();
  const pwdRef = useRef();

  const [hidden, setHid] = useState("");
  const [notices, setNotices] = useState({ noticeData });

  const onChange = function (e) {
    setHid(e.target.value);
  };

  const onChang = function (e) {
    if (e.currentTarget === null) {
      return;
    }
    e.preventDefault();
    // setNotices(...notices, ([e.currentTarget.name] = e.currentTarget.value));
    console.log(notices);
  };

  const onSubmit = (e) => {
    if (pwdRef.current.value === password) {
      e.preventDefault();
      const notice = {
        id: id,
        name: nameRef.current.value || "",
        title: titleRef.current.value || "",
        content: contentRef.current.value || "",
        date: date,
        password: pwdRef.current.value || "",
        secret: hidden,
      };

      formRef.current.reset();
      noticeRepository.saveNotice(notice);
      history.push("/notice");
    } else {
      e.preventDefault();
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
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
                    value={notices.title}
                    onChange={onChang}
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
                    value={notices.name}
                    onChange={onChang}
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
                    value={notices.content}
                    onChange={onChang}
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
          <Button name="수정" onClick={onSubmit} />
          &nbsp;
          <Button name="취소" onClick={goBack} />
        </form>
        <Footer />
      </article>
    </section>
  );
}

export default NoticeEditForm;
