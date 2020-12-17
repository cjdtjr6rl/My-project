import { firebaseDatabase } from "./firebase";

class QnaRepository {
  syncQna(onUpdate) {
    const ref = firebaseDatabase.ref(`Qna`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveQna(qna) {
    firebaseDatabase.ref(`Qna/${qna.id}`).set(qna);
  }

  removeQna(id) {
    firebaseDatabase.ref(`Qna/${id}`).remove();
  }
}

export default QnaRepository;
