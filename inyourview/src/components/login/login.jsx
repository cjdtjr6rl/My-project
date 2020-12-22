import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";
import CryptoJS from "crypto-js";

function Login({ loginRepository }) {
  const history = useHistory();
  const formRef = useRef();
  const idRef = useRef();
  const pwdRef = useRef();
  const [users, setUsers] = useState({});

  useEffect(() => {
    const stopSync = loginRepository.syncLogin((users) => {
      setUsers(users);
    });
    return () => stopSync();
  }, [loginRepository]);

  const onSubmit = function (e) {
    e.preventDefault();
    const user = {
      auth: users.auth,
      id: users.id,
      pwd: users.pwd,
      login: "login",
      name: users.name,
    };
    const decrypt = JSON.parse(
      CryptoJS.AES.decrypt(users.pwd, "secret-key-1").toString(
        CryptoJS.enc.Utf8
      )
    );
    if (idRef.current.value === users.id && pwdRef.current.value === decrypt) {
      alert("로그인하였습니다.");
      loginRepository.saveLogin(user);
      history.push("/");
    } else {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <section className={styles.login}>
      <Header />
      <article className={styles.hello}>
        <h3 className={styles.title}>Login</h3>
        <form ref={formRef}>
          <p>
            <input
              className={styles.input}
              ref={idRef}
              type="text"
              placeholder="아이디"
            />
          </p>
          <p>
            <input
              className={styles.input}
              ref={pwdRef}
              type="password"
              placeholder="비밀번호"
            />
          </p>
          <button className={styles.button} onClick={onSubmit}>
            로그인
          </button>
        </form>
        <Footer users={users} />
      </article>
    </section>
  );
}

export default Login;
