import { firebaseDatabase } from "./firebase";

class LoginRepository {
  syncLogin(onUpdate) {
    const ref = firebaseDatabase.ref(`user`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  //   saveQna(qna) {
  //     firebaseDatabase.ref(`Qna/${qna.id}`).set(qna);
  //   }

  //   removeQna(id) {
  //     firebaseDatabase.ref(`Qna/${id}`).remove();
  //   }
}

export default LoginRepository;
