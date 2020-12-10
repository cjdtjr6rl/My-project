import React, { Component } from "react";
import Mapping from "../map/map";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./way.module.css";

class Way extends Component {
  render() {
    return (
      <section className={styles.way}>
        <Header />
        <div className={styles.hello}>
          <div className={styles.map}>
            <div className={styles.left}>
              <img className={styles.img} src="/images/map.png" alt="map" />
            </div>
            <div className={styles.right}>
              <Mapping />
            </div>
          </div>
          <Footer />
        </div>
      </section>
    );
  }
}

export default Way;
