import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { USER } from '@/constants'

// Utility for persistent session
export const useAuthListener = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
          if(user){
           
           const userDoc=  (await getDoc(doc(db, "users", user.uid))).data()
           if(userDoc?.email!==user.email){

            const userRef = doc(db, 'users', user.uid);

               await updateDoc(userRef, {
                  email: user.email, 
                });

            }
                  
              setUser(userDoc as USER);
              setLoading(false);
           
          }
            
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    return { user, loading };
};
export const getUserDoc=async(uid:string)=>{
  try {
    const userDoc=  (await getDoc(doc(db, "users", uid)))
    if(userDoc.exists()){
      return {nickName:userDoc.data().nickName,avatar:userDoc.data().avatar,userName:userDoc.data().userName}

    }



  } catch (err:any) {
    
  }
}