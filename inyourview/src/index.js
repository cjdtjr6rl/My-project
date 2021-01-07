import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NoticeRepository from "./service/notice_repository";
import QnaRepository from "./service/qna_repository";
import LoginRepository from "./service/login_repository";
import { createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const noticeRepository = new NoticeRepository();
const qnaRepository = new QnaRepository();
const loginRepository = new LoginRepository();

const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App
      noticeRepository={noticeRepository}
      qnaRepository={qnaRepository}
      loginRepository={loginRepository}
    />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
