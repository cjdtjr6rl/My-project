import NoticeRepository from "../service/notice_repository";

const ADD_NOTICE = "notices/ADD_NOTICE";
const DEL_NOTICE = "notices/DEL_NOTICE";

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

let initialState = {};

noticeRepository.syncNotice((notices) => {
  Object.assign(initialState, notices);
});

export default function notices(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTICE:
      return noticeRepository.saveNotice(action.notice);
    case DEL_NOTICE:
      return noticeRepository.removeNotice(action.id);
    default:
      return state;
  }
}
