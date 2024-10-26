import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import {  db } from "./firebase"


export interface DataType{
  founderName:string
  createdAt:Date,
  country:string,
  rank:number

}

export const getFounders=async()=>{
  try {
      const q = query(collection(db, "users"),orderBy('createdAt','asc'));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
         return []
      }else{
        let result:DataType[]=[]
        querySnapshot.docs.map((v,i)=>{
          result.push({
            rank:i+1,
            founderName:v.data().nickName,
            createdAt:v.data().createdAt,
            country:v.data().country
          })
        })
       return result

      }
  } catch (err:any) {
    console.log(err)
  }
}