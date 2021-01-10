import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Intro from "./components/intro/intro";
import Portfolio from "./components/portfolio/portfolio";
import Way from "./components/way/way";
import Notice from "./components/notice/notice";

import { Container, Header, List } from "semantic-ui-react";

import pkg from "semantic-ui-react/package.json";
import Procedure from "./components/procedure/procedure";
import LoginContainer from "./containers/LoginContainer";
import {
  QnaAddContainer,
  QnaDelContainer,
  QnaEditContainer,
} from "./containers/QnaContainer";
import Qna from "./components/qna/qna";
import {
  NoticeAddContainer,
  NoticeDelContainer,
  NoticeEditContainer,
} from "./containers/NoticeContainer";

function App({ children, noticeRepository, qnaRepository }) {
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
            <LoginContainer />
          </Route>
          <Route path="/intro">
            <Intro />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/way">
            <Way />
          </Route>
          <Route path="/procedure">
            <Procedure />
          </Route>
          <Route path="/notice">
            <Notice noticeRepository={noticeRepository} />
          </Route>
          <Route path="/noticeAdd">
            <NoticeAddContainer />
          </Route>
          <Route path="/noticeDetail">
            <NoticeDelContainer />
          </Route>
          <Route path="/noticeEdit">
            <NoticeEditContainer />
          </Route>
          <Route path="/qna">
            <Qna qnaRepository={qnaRepository} />
          </Route>
          <Route path="/qnaAdd">
            <QnaAddContainer />
          </Route>
          <Route path="/qnaDetail">
            <QnaDelContainer />
          </Route>
          <Route path="/qnaEdit">
            <QnaEditContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
