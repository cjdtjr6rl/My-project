import React from "react";
import { useHistory } from "react-router";
import styles from "./footer.module.css";

function Footer(props) {
  const history = useHistory();

  const goLogin = function () {
    history.push("/login");
    // const return_value = prompt("비밀번호를 입력하세요.");
    // if (return_value === password) {
    //   history.push(`/`, qna);
    // } else {
    //   return false;
    // }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.foot}>
        <div className={styles.textlogo}>
          <img
            className={styles.img}
            src="/images/text_logo.jpeg"
            alt="Text Logo"
          />
        </div>
        <br />
        <section className={styles.content}>
          <ul className={styles.ul}>
            <li>
              <strong>010-5170-8534</strong>
            </li>
            <li>
              <span>신한은행 110-515-196062</span>
            </li>
            <li>
              <span>예금주: 송진규 (스포츠아이엔씨)</span>
            </li>
          </ul>
          <ul className={styles.ul}>
            <li>
              <span>CEO</span> 송진규
            </li>
            <li>
              <span>Business No.</span> 819-20-01172
            </li>
            <li>
              <span>Address</span> 서울 강서구 마곡동 800-1 퀸즈파크11차 B-724호
            </li>
            <li>
              <span>Tel</span> 010-5170-8534
            </li>
            <li>
              <span>E-Mail</span> inyourviewpr@gmail.com
            </li>
          </ul>
          <ul className={styles.ul}>
            <li>
              <span>Follow us</span>
            </li>
            <li className={styles.login}>
              <span onClick={goLogin}>Log In</span>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
