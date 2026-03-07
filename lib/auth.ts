'use server'

import { auth, signIn } from "@/lib/config/auth.config";
import { addNewUser, findUserByEmail } from "@/prisma/repository/userRepo";
import { hash } from "bcryptjs";
import {AuthCredentials}  from "next-auth"

export const signInWithCredentials = async(params: Pick<AuthCredentials, 'email' | 'password'>) =>{
    const {email, password} = params;

    console.log("Sign-In Triggered at server", params)

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (!result || result?.error) {
            console.log("❌ Sign-in failed:", result);
            return({success:false, error: result});
        }

        console.log("Sigin Success")
        return({success:true, user:result})

    } catch (error) {
        console.log("❌ Sign-in failed:", error);
        return ({success:false, error:'Invalid Credentials - Enter Valid Credentials'})
    }
}

export const signUp = async(params: AuthCredentials) => {
    const {fullName, email, password, mobileNumber} = params;

    //check if user alreay exist?
    const existingUser = await findUserByEmail(email);

    if(existingUser) {
        return ({success:false, error:'Account Already Exists'})
    }

    const hashedPassword = await hash(password, 10);

    try{

        const newUser = await addNewUser(fullName, email, hashedPassword, mobileNumber );
        return ({success:true, user:newUser})

    } catch (error) {
        console.log("Signup error", error)
        return ({success:false, error:'Signup Error - Failed To Create Account'})
    }
}