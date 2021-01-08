import NoticeRepository from "../service/notice_repository";

const ADD_NOTICE = "notices/ADD_NOTICE";
const DEL_NOTICE = "notices/DEL_NOTICE";

const noticeRepository = new NoticeRepository();

export const addNotice = (notice) => ({
  type: ADD_NOTICE,
  notice,
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
      const adding = noticeRepository.saveNotice(action.notice);
      return {
        ...state,
        adding,
      };
    case DEL_NOTICE:
      const removing = noticeRepository.removeNotice(action.id);
      return {
        ...state,
        removing,
      };
    default:
      return state;
  }
}
