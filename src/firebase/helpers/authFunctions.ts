import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { User } from "../../interfaces/User";
import { auth, db } from "../firebaseConfig";

export const createUserWithEmail = async (
  username: string,
  email: string,
  password: string,
  name: string
) => {
  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addUserToFirestore(createdUser.user.uid, {
    username: username,
    displayName: name,
    email: createdUser.user.email || "",
    photoUrl: createdUser.user.photoURL || "",
    bio: "",
    location: "",
  });
};

export const createUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const createdUser = await signInWithPopup(auth, provider);
  await addUserToFirestore(createdUser.user.uid, {
    username: createdUser.user.displayName?.trim() || "",
    displayName: createdUser.user.displayName || "",
    email: createdUser.user.email || "",
    photoUrl: createdUser.user.photoURL || "",
    bio: "",
    location: "",
  });
};

export const signUserInWithEmail = async () => {};

export const addUserToFirestore = async (userID: string, user: User) => {
  await setDoc(doc(db, "users", userID), user);
  const usersRef = doc(db, "users", userID);
  const usernamesRef = doc(db, "usernames", user.username);
  const batch = writeBatch(db);
  batch.set(usersRef, user);
  batch.set(usernamesRef, { userID: userID });
  await batch.commit();
};

export const isUserNameExists = async (username: string) => {
  console.log("test");
  const usernameRef = await getDoc(doc(db, "usernames", username));
  return usernameRef.exists();
};
