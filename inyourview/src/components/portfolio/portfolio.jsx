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
            src="/images/Jun_image.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide right>
          <img
            className={`${styles.img} ${styles.right}`}
            src="/images/Jun_image.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide left>
          <img
            className={`${styles.img} ${styles.left}`}
            src="/images/Jun_image.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Slide right>
          <img
            className={`${styles.img} ${styles.right}`}
            src="/images/Jun_image.png"
            alt="In Your View Logo"
          />
        </Slide>
        <Footer />
      </div>
    </section>
  );
}

export default Portfolio;
