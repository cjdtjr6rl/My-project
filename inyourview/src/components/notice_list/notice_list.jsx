import React from "react";
import { Label, Table } from "semantic-ui-react";
// import styles from './notice_list.module.css';

function NoticeList({ notice }) {
  const { id, title, name, date } = notice;
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>{id}</Label>
        </Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default NoticeList;
