import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import Hello from "../hello/hello";
import styles from "./main.module.css";

function Main(props) {
  return (
    <section className={styles.main}>
      <Header />
      <div className={styles.hello}>
        <Hello />
      </div>
      <Footer />
    </section>
  );
}

export default Main;
