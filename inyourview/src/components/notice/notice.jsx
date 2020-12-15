import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import NoticeList from "../notice_list/notice_list";
import styles from "./notice.module.css";

function Notice({ noticeRepository }) {
  const history = useHistory();
  const [notices, setNotices] = useState({});

  useEffect(() => {
    const stopSync = noticeRepository.syncNotice((notices) => {
      setNotices(notices);
    });
    return () => stopSync();
  }, [noticeRepository]);

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
              {Object.keys(notices).map((key) => (
                <NoticeList key={key} notice={notices[key]} />
              ))}
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
