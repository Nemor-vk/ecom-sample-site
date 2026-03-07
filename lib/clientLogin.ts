'use client'

import { SITE_ROLES } from "@/app/constants";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const callUpdateIronSessionApi = async () => {
  const webUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!webUrl || webUrl.length <= 0) {
    throw new Error('Site URL missing');
  }

  const res = await fetch(`/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 👈 ensures cookies are sent/received
  });

  // const data = await res; // 👈 this is the plain object you want
  console.log("post call iron response", res.status)
  const jsonResponse = await res.json();
  const userData = jsonResponse.ironSession.user;
  console.log("API RESPONSE JSON: ", jsonResponse)

  //Important to Reflect Login 
  if(userData) {
    refreshPage();
  } 

  return true;
};

export const deleteIronSessionCookieApi = async() => {

  const webUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`/api/logout/`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 👈 ensures cookies are sent/received,
  });

  return({success:true})
}

export const signOutAndDeleteSessions = async() => {

  try {
    await deleteIronSessionCookieApi();
    await signOut();
    refreshPage();
    return true;
  } catch (error) {
    console.log("SignOut Failed : ", error);
    return false;
  }
}

export function refreshPage(): void {
  window.location.reload()
}
// export function redirectAfterLogin():void {

// }