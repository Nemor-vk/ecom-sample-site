'use server'

// lib/session.ts
import { IronSessionData } from 'iron-session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { defaultIronSession, sessionOptions } from './config/ironSessionConfig';

//GET - IRON SESSION FUNCTION :: gets the session cookies from storage & uses sessionOptions to decrpyt data.
export async function getIronSessionDecodedCookie() {
  const ironSession = await getIronSession<IronSessionData>(await cookies(), sessionOptions);

  // console.log("Inside get IRON SESSION - ", ironSession)

  //if ironSession is empty - set isAuthenticated = default value which is FALSE
  if(!ironSession.isAuthenticated) {
    ironSession.isAuthenticated = defaultIronSession.isAuthenticated;
    // console.log("Inside get IRON SESSION :: IF method - ", ironSession)
  }

  const session:IronSessionData = {isAuthenticated:ironSession.isAuthenticated, user:ironSession.user}

  return session;
}