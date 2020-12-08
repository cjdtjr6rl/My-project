import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header(props) {
  const onScroll = function () {
    const nVScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (nVScroll > 40) {
      console.log(nVScroll);
    } else {
      console.log(nVScroll);
    }
  };

  return (
    <header className={styles.header} onScroll={onScroll}>
      <img
        className={styles.logo}
        src="/images/Jun_image.png"
        alt="In Your View Logo"
      />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/intro">
            <button className={styles.button}>인유어뷰</button>
          </Link>
        </li>
        <li className={styles.li}>
          <Link to="/service">
            <button className={styles.button}>가이드</button>
          </Link>
        </li>
        <li className={styles.li}>
          <Link to="/notice">
            <button className={styles.button}>문의</button>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
