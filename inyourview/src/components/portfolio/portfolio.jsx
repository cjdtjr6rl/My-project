import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./portfolio.module.css";
import Slide from "react-reveal/Slide";

function Portfolio({ loginRepository }) {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const stopSync = loginRepository.syncLogin((users) => {
      setUsers(users);
    });
    return () => stopSync();
  }, [loginRepository]);
  return (
    <section className={styles.portfolio}>
      <Header />
      <article id="height" className={styles.hello}>
        <h3 className={styles.title}>포트폴리오</h3>
        <Slide left>
          <img
            className={`${styles.img} ${styles.left}`}
            src="/images/test1.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide right>
          <img
            className={`${styles.img} ${styles.right}`}
            src="/images/test2.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide left>
          <img
            className={`${styles.img} ${styles.left}`}
            src="/images/test3.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide right>
          <img
            className={`${styles.img} ${styles.right}`}
            src="/images/test4.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide left>
          <img
            className={`${styles.img} ${styles.left}`}
            src="/images/test5.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Footer users={users} />
      </article>
    </section>
  );
}

export default Portfolio;
