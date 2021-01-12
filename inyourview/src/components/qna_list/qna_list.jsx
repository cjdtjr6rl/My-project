import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Label, Table } from "semantic-ui-react";
import styles from "./qna_list.module.css";
import CryptoJS from "crypto-js";
import { useMediaQuery } from "react-responsive";

const QnaList = memo(({ qna, login }) => {
  const history = useHistory();
  const { index, id, title, name, date, secret, password } = qna;

  const goDetail = function () {
    history.push(`/qnaDetail/${id}`, qna);
  };

  const goDetail2 = function () {
    const decrypt = JSON.parse(
      CryptoJS.AES.decrypt(password, "secret-key-1").toString(CryptoJS.enc.Utf8)
    );
    const return_value = prompt("비밀번호를 입력하세요.");
    if (return_value === decrypt) {
      history.push(`/qnaDetail/${id}`, qna);
    } else {
      alert("비밀번호를 확인해주세요.");
      return false;
    }
  };

  const goDetail3 = function () {
    history.push(`/qnaDetail/${id}`, qna);
  };

  const isBigScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });
  const isSmallScreen = useMediaQuery({ query: "(max-device-width: 27.5rem)" });

  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>{index}</Label>
        </Table.Cell>
        <Table.Cell>
          {secret === "secret" && login === "login" ? (
            <p className={styles.detail} onClick={goDetail3}>
              {title}🔒
            </p>
          ) : secret === "secret" ? (
            <p className={styles.detail} onClick={goDetail2}>
              {title}🔒
            </p>
          ) : (
            <p className={styles.detail} onClick={goDetail}>
              {title}
            </p>
          )}
        </Table.Cell>
        {isBigScreen && (
          <>
            <Table.Cell>
              <p className={styles.content}>{name}</p>
            </Table.Cell>
            <Table.Cell>
              <p className={styles.content}>{date}</p>
            </Table.Cell>
          </>
        )}
        {isSmallScreen && (
          <>
            <span className={styles.inline}>{name}</span>
            <span className={styles.inline}>{date}</span>
          </>
        )}
      </Table.Row>
    </>
  );
});

export default QnaList;
