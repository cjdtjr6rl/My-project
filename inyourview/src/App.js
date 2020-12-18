import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Intro from "./components/intro/intro";
import Portfolio from "./components/portfolio/portfolio";
import Way from "./components/way/way";
import Notice from "./components/notice/notice";
import NoticeAddForm from "./components/notice_add_form/notice_add_form";
import NoticeEditForm from "./components/notice_edit_form/notice_edit_form";
import NoticeDetail from "./components/notice_detail/notice_detail";

import { Container, Header, List } from "semantic-ui-react";

import pkg from "semantic-ui-react/package.json";
import Qna from "./components/qna/qna";
import QnaAddForm from "./components/qna_add_form/qna_add_form";
import QnaDetail from "./components/qna_detail/qna_detail";
import QnaEditForm from "./components/qna_edit_form/qna_edit_form";
import Login from "./components/login/login";

function App({ children, noticeRepository, qnaRepository, loginRepository }) {
  <Container style={{ margin: 20 }}>
    <Header as="h3">
      This example is powered by Semantic UI React {pkg.version} 😊
    </Header>
    <List bulleted>
      <List.Item
        as="a"
        content="💌 Official documentation"
        href="https://react.semantic-ui.com/"
        target="_blank"
      />
      <List.Item
        as="a"
        content="💡 StackOverflow"
        href="https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=frequent"
        target="_blank"
      />
    </List>

    {children}
  </Container>;

  // TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/login">
            <Login loginRepository={loginRepository} />
          </Route>
          <Route path="/intro">
            <Intro loginRepository={loginRepository} />
          </Route>
          <Route path="/portfolio">
            <Portfolio loginRepository={loginRepository} />
          </Route>
          <Route path="/way">
            <Way loginRepository={loginRepository} />
          </Route>
          <Route path="/notice">
            <Notice
              noticeRepository={noticeRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/noticeAdd">
            <NoticeAddForm
              noticeRepository={noticeRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/noticeDetail">
            <NoticeDetail
              noticeRepository={noticeRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/noticeEdit">
            <NoticeEditForm
              noticeRepository={noticeRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/qna">
            <Qna
              qnaRepository={qnaRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/qnaAdd">
            <QnaAddForm
              qnaRepository={qnaRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/qnaDetail">
            <QnaDetail
              qnaRepository={qnaRepository}
              loginRepository={loginRepository}
            />
          </Route>
          <Route path="/qnaEdit">
            <QnaEditForm
              qnaRepository={qnaRepository}
              loginRepository={loginRepository}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
