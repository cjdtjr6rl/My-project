import LoginRepository from "../service/login_repository";

const LOGIN = "login/LOGIN";

const loginRepository = new LoginRepository();

export const managerLogin = (user) => ({
  type: LOGIN,
  user,
});

let initialState = {};

loginRepository.syncLogin((user) => {
  Object.assign(initialState, user);
});

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      // console.log(action.user);
      return loginRepository.saveLogin(action.user);
    default:
      return state;
  }
}
