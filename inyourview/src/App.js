import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import Intro from "./components/intro/intro";
import Portfolio from "./components/portfolio/portfolio";

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
