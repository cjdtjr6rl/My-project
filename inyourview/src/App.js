import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Intro from "./components/intro/intro";
import Portfolio from "./components/portfolio/portfolio";
import Way from "./components/way/way";
import Notice from "./components/notice/notice";

import { Container, Header, List } from "semantic-ui-react";

import pkg from "semantic-ui-react/package.json";
import NoticeAddForm from "./components/notice_add_form/notice_add_form";

function App({ children, noticeRepository }) {
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
          <Route path="/intro">
            <Intro />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/way">
            <Way />
          </Route>
          <Route path="/notice">
            <Notice noticeRepository={noticeRepository} />
          </Route>
          <Route path="/noticeAdd">
            <NoticeAddForm noticeRepository={noticeRepository} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
