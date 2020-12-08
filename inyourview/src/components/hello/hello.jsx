import React from "react";
import styles from "./hello.module.css";

function Hello(props) {
  return (
    <div className={styles.main}>
      <img
        className={styles.logo}
        src="/images/Jun_image.png"
        alt="In Your View Logo"
      />
    </div>
  );
}

export default Hello;
