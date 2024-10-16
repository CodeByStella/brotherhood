import { sendEmailVerification, signInWithEmailAndPassword, signOut ,createUserWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import { auth, db } from './firebase';
import { getDoc, query, where, collection, getDocs,doc ,setDoc} from "firebase/firestore";
// src/components/Register.js
import { USER } from '@/Components/Main/forms/Registrationform';
import {USER as ReturnType} from '@/constants'

export const  Login= async (identifier: string, password: string) => {
    try {
        let email = identifier;

        // Check if identifier is username, then fetch email based on username
        if (!identifier.includes('@')) {
            const q = query(collection(db, "users"), where("userName", "==", identifier));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                throw new Error("User not found. Please register.");
            }
            email = querySnapshot.docs[0].data().email;
            console.log({email})
        }

        // Log in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if email is verified
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          await signOut(auth)
            throw new Error("Email not verified. Please verify.");
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            throw new Error("User data not found");
        }

        const userData = userDoc.data() as ReturnType ; // All user data

        return {state:'success',msg:'Logged in successfully',data:userData}; // Successfully logged in
    } catch (error:any) {
      console.log(error.code);
      
      if (error.code === 'auth/invalid-credential') {
        return ({state:'error',msg:`${identifier.includes('@')?"Email":"Username"} or password is incorrect.`})
    }else if (error.code === 'auth/wrong-password') {
        return ({state:'error',msg:'Password is incorrect.'})
    } else if (error.code === 'auth/user-not-found') {
         return ({state:'error',msg:'User not found. Please register.'})
    } else {
        return {state:'error',msg:error.message};
      }
    }
    
}




export const Register = async(data:USER) => {
     try {

      const {
        firstName,
        lastName,
        userName,
        nickName,
        sex,
        languagesSpoken,
        languagesWishToLearn,
        birthDate,
        email='',
        telegramUsername,
        phoneNumber,
        facebookId,
        instagramUsername,
        vkId,
        weChatId,
        country,
        state,
        city,
        password='',
        referalId
      }=data

      const collectionRef=collection(db,'users')
      const q=query(collectionRef,where('userName','==',userName))
      const usernameDoc = await getDocs(q);
      if (!usernameDoc.empty) {
        throw new Error("Username already taken. Choose another name.");
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object

  
      console.log(user)
        // Send email verification
        await sendEmailVerification(user);

        // Sign out the user immediately after registration
        await signOut(auth);

       

      // Prepare user data to be saved in Firestore
      const userData = {
        uid: user.uid,
        firstName,
        lastName,
        userName,
        nickName,
        sex,
        languagesSpoken,
        languagesWishToLearn,
        birthDate,
        email,
        telegramUsername,
        phoneNumber,
        facebookId,
        instagramUsername,
        vkId,
        weChatId,
        country,
        state,
        city,
        referalId,
        followers:0,
        following:0,
        avatar:''
        // Add any additional fields you need
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), userData)

     return ({state:'success',msg:'Verification email sent. Please verify your email before signing in.'});
      // You can redirect the user or show a success message here
    } catch (err:any) {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        return ({state:'error',msg:'This email is already registered. Please use another one.'})
      } else {
        return ({state:'error',msg:err.message}); // Handle other potential errors
      } // Capture and display the error message
    } 
  };



  export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

export const resetPassWord=async(identifier:string)=>{
  try {
    if(identifier===''){
      throw new Error('Input email or username.')
    }
    let email = identifier;

        // Check if identifier is username, then fetch email based on username
        if (!identifier.includes('@')) {
            const q = query(collection(db, "users"), where("userName", "==", identifier));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                throw new Error("User not found.");
            }
            email = querySnapshot.docs[0].data().email;
            console.log({email})
        }

        await sendPasswordResetEmail(auth, email);
        return {state:'success',msg:'Password reset email sent. Please check your inbox.'}
  } catch (err:any) {
    return {state:'error',msg:err.message}
  }
}