import { USER } from "@/Components/Main/forms/Registrationform";
import { getAuth, updateEmail, updatePassword, User, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth, db } from "./firebase";
import {  doc, getDoc, updateDoc } from "firebase/firestore";

interface NewData extends USER{
  newPassword?:string,
}




const updateUserData = async (userId:string, userData:any ) => {
  const userRef = doc(db, "users", userId);
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