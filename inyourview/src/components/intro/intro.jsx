import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./intro.module.css";

function Intro(props) {
  return (
    <section className={styles.intro}>
      <Header />
      <div className={styles.container}>사진사진</div>
      <Footer />
    </section>
  );
}

export default Intro;
