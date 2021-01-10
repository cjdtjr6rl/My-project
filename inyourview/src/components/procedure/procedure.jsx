import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./procedure.module.css";

function Procedure() {
  let users = JSON.parse(localStorage.getItem("user"));

  return (
    <section className={styles.procedure}>
      <Header />
      <article id="height" className={styles.hello}>
        <h3 className={styles.title}>진행절차</h3>
        <figure className={styles.figure}>
          <img
            className={styles.img}
            src="/images/procedure01.png"
            alt="procedure01"
          />
          <img
            className={styles.img}
            src="/images/procedure02.png"
            alt="procedure02"
          />
          <img
            className={styles.img}
            src="/images/procedure03.png"
            alt="procedure03"
          />
          <img
            className={styles.img}
            src="/images/procedure04.png"
            alt="procedure04"
          />
          <img
            className={styles.img}
            src="/images/procedure05.png"
            alt="procedure05"
          />
        </figure>
        <Footer users={users} />
      </article>
    </section>
  );
}

export default Procedure;
