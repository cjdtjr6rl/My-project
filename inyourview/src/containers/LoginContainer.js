import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/login/login";
import { managerLogin } from "../modules/login";

function LoginContainer() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onLogin = (user) => dispatch(managerLogin(user));

  return <Login users={user} onLogin={onLogin} />;
}

export default LoginContainer;
