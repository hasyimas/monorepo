import { User } from "shared";
import { db } from "../config/firebaseConfig";

const collectionName = "users";

export const fetchUser = async (token: string): Promise<User[] | null> => {
  try {
    const usersRef = await db.collection(collectionName).get();
    return usersRef.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as User);
  } catch (error) {
    console.log("fetchUser verifyIdToken error", error);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User | null> => {
  try {
    await db.collection(collectionName).doc(user.uid).update({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return user;
  } catch (error) {
    console.log("Update hUser error", error);
    return null;
  }
};
