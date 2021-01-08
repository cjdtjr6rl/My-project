import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./qna_detail.module.css";
import { useLocation } from "react-router";
import CryptoJS from "crypto-js";
import { useMediaQuery } from "react-responsive";

function QnaDetail({ user, qnas, onDel }) {
  const history = useHistory();
  const data = useLocation();
  const qnaData = data.state;
  const { id, title, name, date, content, password } = qnaData;
  // const [users, setUsers] = useState({});

  // useEffect(() => {
  //   const stopSync = loginRepository.syncLogin((users) => {
  //     setUsers(users);
  //   });
  //   return () => stopSync();
  // }, [loginRepository]);

  const pwdRef = useRef();

  const goBack = function () {
    history.goBack();
  };

  const goEdit = function () {
    history.push(`/qnaEdit/${id}`, qnaData);
  };

  const decrypt = JSON.parse(
    CryptoJS.AES.decrypt(password, "secret-key-1").toString(CryptoJS.enc.Utf8)
  );

  const deleteQna = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      if (pwdRef.current.value === decrypt) {
        // qnaRepository.removeQna(id);
        onDel(id);
        history.push("/qna");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    } else {
      return false;
    }
  };

  const isBigScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });
  const isSmallScreen = useMediaQuery({ query: "(max-device-width: 27.5rem)" });

  return (
    <section className={styles.qnadetail}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>게시판</h3>
        <div className={styles.tablewrap}>
          {isBigScreen && (
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
          )}
          {isSmallScreen && (
            <table className={styles.table}>
              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <td className={styles.td}>
                    <p>{title}</p>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.inline}>{name}</span>
                    <span className={styles.inline}>{date}</span>
                  </td>
                </tr>
                <tr className={styles.tr}>
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
                <tr className={styles.tr}>
                  <td className={styles.td}>
                    비밀번호:&nbsp;&nbsp;&nbsp;&nbsp;
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
          )}
          <Button name="목록" onClick={goBack} />
          &nbsp;
          <Button name="수정" onClick={goEdit} />
          &nbsp;
          <Button name="삭제" onClick={deleteQna} />
        </div>
        <Footer users={user} />
      </article>
    </section>
  );
}

export default QnaDetail;
