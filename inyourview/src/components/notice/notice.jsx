import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "semantic-ui-react";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import NoticeList from "../notice_list/notice_list";
import ReactPaginate from "react-paginate";
import styles from "./notice.module.css";
import { useMediaQuery } from "react-responsive";

const PER_PAGE = 10;

function Notice({ noticeRepository, loginRepository }) {
  const history = useHistory();
  const [notices, setNotices] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const stopSync = noticeRepository.syncNotice((notices) => {
      setNotices(notices);
    });
    return () => stopSync();
  }, [noticeRepository]);

  useEffect(() => {
    const stopSync = loginRepository.syncLogin((users) => {
      setUsers(users);
    });
    return () => stopSync();
  }, [loginRepository]);

  const onClick = function () {
    history.push("/noticeAdd");
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = Object.keys(notices)
    .slice(offset, offset + PER_PAGE)
    .map((key) => <NoticeList key={key} notice={notices[key]} />);

  const isSmallScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });

  return (
    <section className={styles.notice}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>공지사항</h3>
        <div className={styles.tablewrap}>
          <Table celled>
            {isSmallScreen && (
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className={styles.tr1}>
                    번호
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles.tr2}>
                    제목
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles.tr3}>
                    작성자
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles.tr4}>
                    작성일
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            )}

            <Table.Body>{currentPageData}</Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <ReactPaginate
                    pageCount={Math.ceil(Object.keys(notices).length / 10)}
                    pageRangeDisplayed={10}
                    marginPagesDisplayed={0}
                    breakLabel={""}
                    previousLabel={"<"}
                    nextLabel={">"}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    previousLinkClassName={styles.pagination__link}
                    nextLinkClassName={styles.pagination__link}
                    disabledClassName={styles.pagination__link_disabled}
                    activeClassName={styles.pagination__link_active}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          {users.login === "login" && (
            <Button name="글쓰기" onClick={onClick} />
          )}
        </div>
        <Footer users={users} />
      </article>
    </section>
  );
}

export default Notice;
