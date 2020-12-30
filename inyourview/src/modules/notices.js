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

let initialArray = [];

const stopSync = noticeRepository.syncNotice((notices) => {
  initialArray.concat(notices);
  return initialArray;
});

// useEffect(() => {
//     const stopSync = noticeRepository.syncNotice((notices) => {
//       setNotices(notices);
//     });
//     return () => stopSync();
//   }, [noticeRepository]);

export default function notices(state = initialArray, action) {
  switch (action.type) {
    case ADD_NOTICE:
      return state.saveNotice(action.notice);
    case DEL_NOTICE:
      return state.removeNotice(action.id);
    default:
      return state;
  }
}
