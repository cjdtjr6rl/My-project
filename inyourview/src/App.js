import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Intro from "./components/intro/intro";
import Portfolio from "./components/portfolio/portfolio";
import Way from "./components/way/way";
import Notice from "./components/notice/notice";

function App() {
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
            <Notice />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
