import { firebaseDatabase } from "./firebase";

class LoginRepository {
  syncLogin(onUpdate) {
    const ref = firebaseDatabase.ref(`user/1`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveLogin(user) {
    firebaseDatabase.ref(`user/${user.auth}`).set(user);
  }

  //   removeQna(id) {
  //     firebaseDatabase.ref(`Qna/${id}`).remove();
  //   }
}

export default LoginRepository;
