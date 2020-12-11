import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./intro.module.css";

function Intro(props) {
  return (
    <section className={styles.intro}>
      <Header />
      <div className={styles.hello}>
        <h3>소개</h3>
      </div>
      <Footer />
    </section>
  );
}

export default Intro;
