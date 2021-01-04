import LoginRepository from "../service/login_repository";

const LOGIN = "login/LOGIN";

const loginRepository = new LoginRepository();

export const login = (user) => ({
  type: LOGIN,
  user: {
    user,
  },
});

let initialState = {};

loginRepository.syncLogin((user) => {
  Object.assign(initialState, user);
});

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return loginRepository.saveLogin(action.user);
    default:
      return state;
  }
}
