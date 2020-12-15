import React from "react";
import { Label, Table } from "semantic-ui-react";

function NoticeList({ notice }) {
  const { title, name, date } = notice;
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>1</Label>
        </Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default NoticeList;
