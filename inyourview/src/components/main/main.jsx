import React from "react";
import Header from "../header/header";
import styles from "./main.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

function Main() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const imgStyle = {
    height: "100vh",
  };
  return (
    <section className={styles.main}>
      <Header />
      <div className={styles.hello}>
        <div className={styles.sliding}>
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={3000}
            bullets={false}
            style={imgStyle}
            className={styles.slide}
          >
            <div data-src="/images/test1.png" />
            <div data-src="/images/test2.png" />
            <div data-src="/images/test3.png" />
            <div data-src="/images/test4.png" />
            <div data-src="/images/test5.png" />
          </AutoplaySlider>
        </div>
      </div>
    </section>
  );
}

export default Main;
