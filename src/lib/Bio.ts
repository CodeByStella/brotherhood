import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export const saveBio=async(bio:string)=>{
  try {
    const userId=auth.currentUser?.uid
    if(!userId)throw new Error('Please sign in before post blog')
      await setDoc(doc(db,'bios',userId),{content:bio})
    return {state:'success',msg:'Saved bio successfully!'}
  } catch (err:any) {
    console.log(err)
    return {state:'error',msg:err.message}
  }
}
export const getBio=async(userid?:string)=>{
  try {
    let uid=auth.currentUser?.uid
    if(userid)uid=userid
    
    if(uid){
       const bio=await getDoc(doc(db,'bios',uid))
    if(!bio.exists())throw new Error("Bio not found")
    return bio.data().content
    }
   
  } catch (err:any) {
    console.log(err)
  }
}