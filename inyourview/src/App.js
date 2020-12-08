import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/main/main";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
