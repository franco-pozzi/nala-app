import { auth } from "../../lib/firebase";

export default {
  signOut: () => auth.signOut(),
  onChange: (callback) => auth.onAuthStateChanged(callback),
};
