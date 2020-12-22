import React from "react";
import { useHistory } from "react-router-dom";
import { Label, Table } from "semantic-ui-react";
import styles from "./qna_list.module.css";
import CryptoJS from "crypto-js";
import { useMediaQuery } from "react-responsive";

function QnaList({ qna, login }) {
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
      {secret === "common" ? (
        <Table.Row>
          <Table.Cell>
            <Label ribbon>{index}</Label>
          </Table.Cell>
          <Table.Cell>
            <p className={styles.detail} onClick={goDetail}>
              {title}
            </p>
          </Table.Cell>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
      ) : (
        <Table.Row>
          <Table.Cell>
            <Label ribbon>{index}</Label>
          </Table.Cell>
          <Table.Cell>
            {login === "login" ? (
              <p className={styles.detail} onClick={goDetail3}>
                {title}🔒
              </p>
            ) : (
              <p className={styles.detail} onClick={goDetail2}>
                {title}🔒
              </p>
            )}
          </Table.Cell>
          {isBigScreen && (
            <>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
            </>
          )}
          {isSmallScreen && (
            <>
              <span className={styles.inline}>{name}</span>
              <span className={styles.inline}>{date}</span>
            </>
          )}
        </Table.Row>
      )}
    </>
  );
}

export default QnaList;
