import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./notice.module.css";

function Notice(props) {
  return (
    <section className={styles.notice}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>공지사항</h3>
        <span>공지공지</span>
        <Footer />
      </article>
    </section>
  );
}

export default Notice;
