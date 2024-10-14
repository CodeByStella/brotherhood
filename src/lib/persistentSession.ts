import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { USER } from '@/constants'

// Utility for persistent session
export const useAuthListener = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if(user){
             getDoc(doc(db, "users", user.uid)).then(
              userDoc=>{
                
                  
                  setUser(userDoc.data() as USER);
                  setLoading(false);
              }
            )
           
          }
            
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    return { user, loading };
};