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

let initialState = {};

loginRepository.syncLogin((users) => {
  Object.assign(initialState, users);
  localStorage.setItem("user", JSON.stringify(initialState));
});

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App noticeRepository={noticeRepository} qnaRepository={qnaRepository} />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
