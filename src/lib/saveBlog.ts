import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

interface Blog {
  postedBy?: string | undefined;
  created_at: Date;
  title: string;
  content: string;
  references?: string[] | undefined;
  image?: string;
  video?: string;
  tags?: string[] | undefined;
  type: string;
}

export const saveBlog = async (blog: Blog) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("Please sign in before post blog");
    }

    const blogRef = doc(collection(db, "blogs")); // This generates a unique ID for a new document
    await setDoc(blogRef, { ...blog, uid: userId });

    return {
      state: "success",
      msg: "Saved successfully!",
    };
  } catch (err: any) {
    console.log(err);
    return { state: "error", msg: err.message };
  }
};
