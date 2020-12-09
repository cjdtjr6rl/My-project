import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./main.module.css";

function Main(props) {
  return (
    <section className={styles.main}>
      <Header />
      <div className={styles.hello}>
        <img
          className={styles.logo}
          src="/images/Jun_image.png"
          alt="In Your View Logo"
        />
        <Footer />
      </div>
    </section>
  );
}

export default Main;
