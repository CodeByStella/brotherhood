import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (path:string, avatarFile:File) => {
 
  const avatarRef = ref(storage, path);
  await uploadBytes(avatarRef, avatarFile);
  const avatarURL = await getDownloadURL(avatarRef);
  return avatarURL;
};