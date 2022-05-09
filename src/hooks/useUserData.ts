import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { User } from "../interfaces/User";

export function useUserData() {
  const [currentUser] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);

  const getUserData = async () => {
    const userRef = doc(db, "users", currentUser!.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUser(userSnap.data() as User);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUserData();
    } else {
      setUser(null);
    }
  }, [currentUser]);

  return {
    user,
  };
}
