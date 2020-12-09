import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./main.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

function Main() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <section className={styles.main}>
      <Header />
      <div className={styles.hello}>
        <AutoplaySlider play={true} cancelOnInteraction={false} interval={3000}>
          <div data-src="/images/test1.png" />
          <div data-src="/images/test2.png" />
          <div data-src="/images/test3.png" />
          <div data-src="/images/test4.png" />
          <div data-src="/images/test5.png" />
        </AutoplaySlider>
        <Footer />
      </div>
    </section>
  );
}

export default Main;
