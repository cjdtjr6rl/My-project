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
          <h3>찾아오는 길</h3>
          <div className={styles.map}>
            <div className={styles.left}>
              <img className={styles.img} src="/images/map.png" alt="map" />
            </div>
            <div className={styles.right}>
              <Mapping />
            </div>
          </div>
          <span className={styles.info}>
            <p>서울시 강서구 마곡동 800-1 문영퀸즈파크11차B동 724호</p>
            <p>KAKAO: 인유여뷰</p>
            <p>e-MAIL: inyourviewpr@gmail.com</p>
          </span>
          <Footer />
        </div>
      </section>
    );
  }
}

export default Way;
