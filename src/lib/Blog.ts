import { addDoc, arrayUnion, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, Timestamp, updateDoc, where } from "firebase/firestore";
import {  auth, db } from "./firebase";

export const getBlogCounts=async(uid?:string|undefined,type?:string)=>{
  try {
    const blogsRef = collection(db, 'blogs');
    let conditions: any[]=[]
   if(uid){
    conditions.push(where('uid', '==', uid)); 
    if(type){
      conditions.push(where('type', '==',type));  
    }
    }
   
    let q = query(blogsRef, ...conditions);
    const snapshot=await getCountFromServer(q)
    return snapshot.data().count
  } catch (err:any) {
    console.log(err)
  }
}

export const getBlogs = async (opt: { current: number, size: number }, uid?: string,  type?: string) => {
  try {
    console.log(opt,uid,type,'=====>')
    // Collection reference
    const blogsRef = collection(db, 'blogs');

    // Initialize query conditions
    let conditions: any[] = [orderBy("created_at",'desc')];

    // Add conditional filters
    if (uid) {
      conditions.push(where('uid', '==', uid));
    
      if (type) conditions.push(where('type', '==', type));
    }

    // Construct query
    let q = query(blogsRef, ...conditions);

    // Apply pagination if there's a last visible document
    

    // Fetch the documents
    const snapshot = await getDocs(q);

    // Get the last visible document for pagination
    const start = (opt.current - 1) * opt.size;
    const end = start + opt.size;

    // Slice the results manually
    const data = snapshot.docs.slice(start, end).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        totalViews:doc.data().totalViews?.length,
    }});
    let results=[]
    for (let i = 0; i < data.length; i++) {
      const commentsQuery = query(
        collection(db, "comments"),
        where("blogId", "==", data[i].id),
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      results.push({...data[i],comments:commentsSnapshot.size})
      
    }

    return results;

   
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message || error);
    throw error; // Re-throw the error for further handling
  }
};
export const getBlog=async(id:string)=>{
  try {
    let isAdded=0
    let docRef = doc(db, 'blogs', id);
    const uid=auth.currentUser?.uid
 

    // Fetch the document from Firestore
    const blog = await getDoc(docRef);
    
    
    // Check if the document exists and return its data
    if (blog.exists()) {
      const blogData = blog.data();
      if(uid)
        {
          
          // Check if the user's userId is already in the totalView array
          if (!blogData.totalViews || !blogData.totalViews.includes(uid)) {
            // Update the totalView array to add the current user's userId
            await updateDoc(docRef, {
              totalViews: arrayUnion(uid) // arrayUnion ensures no duplicates
            });
            isAdded=1
          }
        } 
          
      docRef=doc(db, 'users', blog.data().uid);
      const user = await getDoc(docRef);

      if(user.exists()){
        const commentsQuery = query(
          collection(db, "comments"),
          where("blogId", "==", blog.id),
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        return { id: blog.id, ...blog.data(),avatar:user.data().avatar,totalViews:blogData.totalViews?.length?blogData.totalViews?.length+isAdded:isAdded,comments:commentsSnapshot.size }; // Return the document data along with its ID
      }

        
    } else {
        console.log("No such document!");
        return null;
    }
  } catch (error:any) {
    console.log(error)
  }
}


export const sendComment=async(blogId:string,content:string)=>{
  try {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;  // Current logged-in user ID
  
      try {
        // Add a new comment to the comments collection
        await addDoc(collection(db, "comments"), {
          blogId: blogId,          // The blog post this comment is related to
          userId: userId,          // The ID of the user making the comment
          comment: content,    // The actual comment text
          createdAt: Timestamp.now()  // Timestamp of when the comment was created
        });
        return {state:'success',msg:'Comment successfully added!'}
      } catch (error) {
        throw error
      }
    } else {
      throw new Error("No user is logged in.");
    }
  } catch (err:any) {
    return {state:'error',msg:err.message}
  }
}

export const getComments = async (blogId:string) => {
  try {
    // Fetch comments based on blogId
    const commentsQuery = query(
      collection(db, "comments"),
      where("blogId", "==", blogId),
      orderBy("createdAt",'desc')
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = [];

    // Loop through each comment and fetch the corresponding user data
    for (const commentDoc of commentsSnapshot.docs) {
      const commentData = commentDoc.data();
      const userId = commentData.userId;

      // Fetch user details from the users collection based on userId
      const userDoc = await getDoc(doc(db, "users", userId));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Combine comment and user data
        commentsData.push({
          commentId: commentDoc.id,  // Comment document ID
          ...commentData,            // Spread comment fields like blogId, comment, createdAt
          user: {                    // Add user data
            userId: userDoc.id,      // User ID (same as userId field)
            avatar:userData.avatar,
            nickName:userData.nickName             // Spread user fields like displayName, avatar, etc.
          },
        });
      } else {
        // Handle case where user data is not found (optional)
        console.error(`User not found for userId: ${userId}`);
      }
    }

    return commentsData;
  } catch (err: any) {
    console.log(err)
  }
};

export const like = async(blogId:string) => { 
  try {
    let docRef = doc(db, 'blogs', blogId);
    const uid=auth.currentUser?.uid
 

    // Fetch the document from Firestore
    const blog = await getDoc(docRef);
    
    
    // Check if the document exists and return its data
    if (blog.exists()) {
      const blogData = blog.data();
      if(uid)
        {
          // Check if the user's userId is already in the totalView array
          if (!blogData.likes || !blogData.likes.includes(uid)) {
            // Update the totalView array to add the current user's userId
            await updateDoc(docRef, {
              likes: arrayUnion(uid) // arrayUnion ensures no duplicates
            });
          }else{
            throw new Error('You already clicked!')
          }
        } 
      }else{
         throw new Error('Blog not found!')
      }
      return {state:'success'}
          
  } catch (err:any) {
    console.log(err)
    return {state:'error'}
  }
 } 

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

export const saveBlog = async (blog: Blog,id?:string) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("Please sign in before post blog");
    }
    let blogRef
    if(id){

      blogRef= doc(collection(db, "blogs"),id);
      await setDoc(blogRef, { ...blog, uid: userId }, { merge: true }); // This replace a unique ID for a existing document
    }else{
      blogRef= doc(collection(db, "blogs")); // This generates a unique ID for a new document
      await setDoc(blogRef, { ...blog, uid: userId });
    }
    

    return {
      state: "success",
      msg: "Saved successfully!",
    };
  } catch (err: any) {
    console.log(err);
    return { state: "error", msg: err.message };
  }
};

export const deleteBlog=async(blogId:string)=>{
  try {
    const blogDocRef = doc(db, 'blogs', blogId);

    // Delete the blog document
    await deleteDoc(blogDocRef);
    return { state: 'success', msg: 'Blog deleted successfully!' };
  } catch (err:any) {
    console.log(err)
    return { state: 'error', msg: err.message };
  }
}