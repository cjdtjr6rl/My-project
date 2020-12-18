import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./intro.module.css";

function Intro({ loginRepository }) {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const stopSync = loginRepository.syncLogin((users) => {
      setUsers(users);
    });
    return () => stopSync();
  }, [loginRepository]);

  return (
    <section className={styles.intro}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>소개</h3>
      </article>
      <Footer users={users} />
    </section>
  );
}

export default Intro;
