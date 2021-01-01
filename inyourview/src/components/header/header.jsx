import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useHistory } from "react-router-dom";
import styles from "./header.module.css";

function Header(props) {
  const history = useHistory();

  const hover1 = function () {
    const box = document.getElementById("hover1");
    box.style.display = "inline";
  };
  const hout1 = function () {
    const box = document.getElementById("hover1");
    box.style.display = "none";
  };
  const hover2 = function () {
    const box = document.getElementById("hover2");
    box.style.display = "inline";
  };
  const hout2 = function () {
    const box = document.getElementById("hover2");
    box.style.display = "none";
  };
  const hover3 = function () {
    const box = document.getElementById("hover3");
    box.style.display = "inline";
  };
  const hout3 = function () {
    const box = document.getElementById("hover3");
    box.style.display = "none";
  };

  const goToHome = function () {
    history.push("/");
  };

  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen(!open);
  };

  const isBigScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });
  const isSmallScreen = useMediaQuery({ query: "(max-device-width: 27.5rem)" });

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src="/images/logo.png"
        alt="In Your View Logo"
        onClick={goToHome}
      />
      {isBigScreen && (
        <ul className={styles.ul}>
          <li className={styles.li}>
            <div onMouseOver={hover1} onMouseOut={hout1}>
              <button className={styles.button}>인유어뷰</button>
              <ul id="hover1" className={styles.sevul}>
                <Link to="/intro">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      소개
                    </button>
                  </li>
                </Link>
                <Link to="/portfolio">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      포트폴리오
                    </button>
                  </li>
                </Link>
                <Link to="/way">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      찾아오는 길
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <li className={styles.li}>
            <div onMouseOver={hover2} onMouseOut={hout2}>
              <button className={styles.button}>가이드</button>
              <ul id="hover2" className={styles.sevul}>
                <Link to="/list">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      서비스 목록
                    </button>
                  </li>
                </Link>
                <Link to="/procedure">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      진행절차
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <li className={styles.li}>
            <div onMouseOver={hover3} onMouseOut={hout3}>
              <button className={styles.button}>문의</button>
              <ul id="hover3" className={styles.sevul}>
                <Link to="/notice">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      공지사항
                    </button>
                  </li>
                </Link>
                <Link to="/qna">
                  <li className={styles.sevli}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      게시판
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
        </ul>
      )}
      {isSmallScreen && (
        <div>
          <button
            className={
              open
                ? `${styles.menu_trigger} ${styles.active}`
                : `${styles.menu_trigger}`
            }
            onClick={onToggle}
            open={open}
          >
            <span> </span>
            <span> </span>
            <span> </span>
          </button>
          {open && (
            <div className={styles.wrap}>
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <div onMouseOver={hover1} onMouseOut={hout1}>
                    <button className={styles.button}>인유어뷰</button>
                    <ul id="hover1" className={styles.sevul}>
                      <Link to="/intro">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            소개
                          </button>
                        </li>
                      </Link>
                      <Link to="/portfolio">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            포트폴리오
                          </button>
                        </li>
                      </Link>
                      <Link to="/way">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            찾아오는 길
                          </button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className={styles.li}>
                  <div onMouseOver={hover2} onMouseOut={hout2}>
                    <button className={styles.button}>가이드</button>
                    <ul id="hover2" className={styles.sevul}>
                      <Link to="/list">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            서비스 목록
                          </button>
                        </li>
                      </Link>
                      <Link to="/procedure">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            진행절차
                          </button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className={styles.li}>
                  <div onMouseOver={hover3} onMouseOut={hout3}>
                    <button className={styles.button}>문의</button>
                    <ul id="hover3" className={styles.sevul}>
                      <Link to="/notice">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            공지사항
                          </button>
                        </li>
                      </Link>
                      <Link to="/qna">
                        <li className={styles.sevli}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            게시판
                          </button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
