import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./portfolio.module.css";
import Slide from "react-reveal/Slide";

function Portfolio(props) {
  return (
    <section className={styles.portfolio}>
      <Header />
      <div id="height" className={styles.hello}>
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
        <Footer />
      </div>
    </section>
  );
}

export default Portfolio;
