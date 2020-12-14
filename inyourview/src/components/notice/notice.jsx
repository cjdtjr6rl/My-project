import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./notice.module.css";

function Notice(props) {
  const history = useHistory();
  const onClick = function () {
    history.push("/noticeAdd");
  };

  return (
    <section className={styles.notice}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>공지사항</h3>
        <div className={styles.tablewrap}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>번호</Table.HeaderCell>
                <Table.HeaderCell>제목</Table.HeaderCell>
                <Table.HeaderCell>작성자</Table.HeaderCell>
                <Table.HeaderCell>작성일</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>1</Label>
                </Table.Cell>
                <Table.Cell>2021년도 가격 이벤트</Table.Cell>
                <Table.Cell>이준형</Table.Cell>
                <Table.Cell>2020-12-12</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Label>2</Label>
                </Table.Cell>
                <Table.Cell>제목 test2</Table.Cell>
                <Table.Cell>이준형</Table.Cell>
                <Table.Cell>2020-12-13</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Label>3</Label>
                </Table.Cell>
                <Table.Cell>제목 test3</Table.Cell>
                <Table.Cell>이준형</Table.Cell>
                <Table.Cell>2020-12-14</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Label>4</Label>
                </Table.Cell>
                <Table.Cell>제목 test4</Table.Cell>
                <Table.Cell>이준형</Table.Cell>
                <Table.Cell>2020-12-15</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          <Button name="글쓰기" onClick={onClick} />
        </div>
        <Footer />
      </article>
    </section>
  );
}

export default Notice;
