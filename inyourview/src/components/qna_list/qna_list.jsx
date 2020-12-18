import React from "react";
import { useHistory } from "react-router-dom";
import { Label, Table } from "semantic-ui-react";
import styles from "./qna_list.module.css";
import CryptoJS from "crypto-js";

function QnaList({ qna }) {
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
            <p className={styles.detail} onClick={goDetail2}>
              {title}🔒
            </p>
          </Table.Cell>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
      )}
    </>
  );
}

export default QnaList;
