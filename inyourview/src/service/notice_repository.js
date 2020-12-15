import { firebaseDatabase } from "./firebase";

class NoticeRepository {
  syncNotice(onUpdate) {
    const ref = firebaseDatabase.ref(`notice`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveNotice(notice) {
    firebaseDatabase.ref(`notice/${notice.id}`).set(notice);
  }

  // removeCard(userId, card) {
  //     firebaseDatabase.ref(`maker/${userId}/cards/${card.id}`).remove();
  // }
}

export default NoticeRepository;
