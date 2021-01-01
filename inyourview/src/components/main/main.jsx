import React from "react";
import Header from "../header/header";
import styles from "./main.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { useMediaQuery } from "react-responsive";

function Main() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const imgStyle = {
    height: "100vh",
  };

  const isBigScreen = useMediaQuery({ query: "(min-device-width: 27.5rem)" });
  const isSmallScreen = useMediaQuery({ query: "(max-device-width: 27.5rem)" });

  return (
    <section className={styles.main}>
      <Header />
      <article className={styles.hello}>
        <span className={styles.sliding}>
          {isBigScreen && (
            <AutoplaySlider
              play={true}
              cancelOnInteraction={false}
              interval={3000}
              bullets={false}
              style={imgStyle}
              className={styles.slide}
            >
              <div data-src="/images/main1.png" />
              <div data-src="/images/main2.jpeg" />
              <div data-src="/images/main3.png" />
            </AutoplaySlider>
          )}
          {isSmallScreen && (
            <AutoplaySlider
              play={true}
              cancelOnInteraction={false}
              interval={3000}
              bullets={false}
              style={imgStyle}
              className={styles.slide}
            >
              <div data-src="/images/m_main1.png" />
              <div data-src="/images/m_main2.png" />
              <div data-src="/images/m_main3.png" />
            </AutoplaySlider>
          )}
        </span>
      </article>
    </section>
  );
}

export default Main;
