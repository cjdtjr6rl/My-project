import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./notice_detail.module.css";
import { useLocation } from "react-router";

function NoticeDetail({ noticeRepository }) {
  const history = useHistory();
  const data = useLocation();
  const noticeData = data.state;
  const { id, title, name, date, content } = noticeData;

  const goBack = function () {
    history.push("/notice");
  };

  const goEdit = function () {
    history.push(`/noticeEdit/${id}`, noticeData);
  };

  const deleteNotice = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      noticeRepository.removeNotice(id);
      history.push("/notice");
    } else {
      return false;
    }
  };

  return (
    <section className={styles.noticedetail}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>공지사항</h3>
        <div className={styles.tablewrap}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>제목</th>
                <td className={styles.td}>
                  <p>{title}</p>
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>작성자</th>
                <td className={styles.td}>
                  <p>{name}</p>
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>작성일</th>
                <td className={styles.td}>
                  <p>{date}</p>
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>내용</th>
                <td className={styles.td}>
                  <p>
                    {content.split("\n").map((line, i) => {
                      return (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      );
                    })}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Button name="목록" onClick={goBack} />
          &nbsp;
          <Button name="수정" onClick={goEdit} />
          &nbsp;
          <Button name="삭제" onClick={deleteNotice} />
        </div>
        <Footer />
      </article>
    </section>
  );
}

export default NoticeDetail;
