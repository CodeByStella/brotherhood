import { USER } from "@/Components/Main/forms/Registrationform";
import { getAuth, updateEmail, updatePassword, User, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth, db } from "./firebase";
import {  collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

interface NewData extends USER{
  newPassword?:string,
}




const updateUserData = async (userId:string, userData:any ) => {
  
      //  const collectionRef=collection(db,'users')
      // const q=query(collectionRef,where('userName','==',userData.userName))
      // const usernameDoc = await getDocs(q);
      // if (!usernameDoc.empty) {
      //   throw new Error("Username already taken. Choose another name.");
      // }
  userData.email=auth.currentUser?.email
  const userRef = doc(db, "users", userId);
  const collectionRef=collection(db,'users')
  const q=query(collectionRef,where('userName','==',userData.referralId))
        const users=await getDocs(q)
        let referral=''
        if(!users.empty){
          referral=users.docs[0].data().uid
        }
        userData.referralId=referral
  await updateDoc(userRef, userData);
};



export const editUserData = async (data:NewData ) => {
  try {
    const user=auth.currentUser
    const userId = user?.uid;

    
    // Update email and password
    if(userId){
      
      if (data.newPassword) {
        await updatePassword(user,data.newPassword);
        }
       // Update Firestore
       delete data.newPassword
      await updateUserData(userId, data as USER );
      if (data.email&& data.email!==user.email) {
        await verifyBeforeUpdateEmail(user,data.email)
      }

    }else{
      throw new Error('Before edit profile, Please sign in.')
    }
    const updatedUserData=await getDoc(doc(db,'users',userId))
    return {
      state:'success',
      msg:'Saved successfully!',
      data:updatedUserData.data()
    }

   


  } catch (error:any) {
    console.error("Error updating user data:", error);
    if(error.code==='auth/requires-recent-login'){
      return {state:'error',msg:'To chage password, Need to login recently.'}
    }
    if(error.code==='auth/operation-not-allowed'){
      return {state:'info',msg:'To chage email, Need to verify new email. Please check your inbox.'}
    }
    return {state:'error',msg:error.message}
  }
};