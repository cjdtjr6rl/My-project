import React from "react";
import { useHistory } from "react-router-dom";
import { Label, Table } from "semantic-ui-react";
import styles from "./notice_list.module.css";

function NoticeList({ notice }) {
  const history = useHistory();
  const { id, index, title, name, date } = notice;

  const goDetail = function () {
    history.push(`/noticeDetail/${id}`, notice);
  };

  return (
    <>
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
    </>
  );
}

export default NoticeList;
