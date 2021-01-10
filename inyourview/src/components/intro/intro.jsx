import React, { memo } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./intro.module.css";

const Intro = memo(() => {
  let users = JSON.parse(localStorage.getItem("user"));

  return (
    <section className={styles.intro}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>소개</h3>
      </article>
      <Footer users={users} />
    </section>
  );
});

export default Intro;
