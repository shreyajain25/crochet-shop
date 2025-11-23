// src/firestoreUtils.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function addProduct(name, image, price) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      price,
    });
    console.log("Product added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding product:", e);
  }
}


async function uploadImage(file) {
  if (!file) return null;

  const storageRef = ref(storage, `product-images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file); // upload image to Storage
  const url = await getDownloadURL(storageRef); // get public URL
  return url;
}
