// import LoginRepository from "../service/login_repository";
import NoticeRepository from "../service/notice_repository";

// const SET_NOTICE = "notices/SET_NOTICE";
const ADD_NOTICE = "notices/ADD_NOTICE";
const DEL_NOTICE = "notices/DEL_NOTICE";

// const loginRepository = new LoginRepository();
const noticeRepository = new NoticeRepository();

export const addNotice = (notice) => ({
  type: ADD_NOTICE,
  notice: {
    notice,
  },
});

export const delNotice = (id) => ({
  type: DEL_NOTICE,
  id,
});

const initialState = [];

const stopSync = noticeRepository.syncNotice((notices) => {
  let initialArray = initialState.concat(notices);
  console.log(initialArray);
  return initialArray;
});

export default function notices(state = stopSync, action) {
  switch (action.type) {
    case ADD_NOTICE:
      return state.saveNotice(action.notice);
    case DEL_NOTICE:
      return state.removeNotice(action.id);
    default:
      return state;
  }
}
