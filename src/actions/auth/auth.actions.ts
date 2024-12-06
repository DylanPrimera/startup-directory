'use server'

import { signOut, signIn } from "../../../auth";


export const logOut = async() =>{
    await signOut();
}

export const googleLogin = async()=> {
    await signIn("google");
}