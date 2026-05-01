import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";

export const addToWishlist = async (userId, movie) => {
  const userDocRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        wishlist: [movie],
        watched: [],
      });
    } else {
      await updateDoc(userDocRef, {
        wishlist: arrayUnion(movie),
      });
    }
    console.log("Фильм добавлен в Wishlist!");
  } catch (error) {
    console.error("Ошибка при добавлении в Wishlist:", error);
  }
};

export const removeFromWishlist = async (userId, movie) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      wishlist: arrayRemove(movie),
    });
    console.log("Удалено из базы");
  } catch (error) {
    console.error("Ошибка удаления:", error);
  }
};

export const addToWatched = async (userId, movie) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      watched: arrayUnion({ ...movie, watchedAt: new Date() }),
      wishlist: arrayRemove(movie),
    });
    console.log("Фильм добавлен в Watched!");
  } catch (error) {
    console.error("Ошибка при добавлении в Watched:", error);
  }
};
