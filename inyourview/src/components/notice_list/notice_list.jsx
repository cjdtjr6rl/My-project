import React from "react";
import { useHistory } from "react-router-dom";
import { Label, Table } from "semantic-ui-react";
import styles from "./notice_list.module.css";
import { useMediaQuery } from "react-responsive";

function NoticeList({ notice }) {
  const history = useHistory();
  const { id, index, title, name, date } = notice;

  const goDetail = function () {
    history.push(`/noticeDetail/${id}`, notice);
  };

  const isSmallScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });
  const isBigScreen = useMediaQuery({ query: "(max-device-width: 27.5rem)" });

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
        {isSmallScreen && (
          <>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{date}</Table.Cell>
          </>
        )}
        {isBigScreen && (
          <>
            <span className={styles.inline}>{name}</span>
            <span className={styles.inline}>{date}</span>
          </>
        )}
      </Table.Row>
    </>
  );
}

export default NoticeList;
