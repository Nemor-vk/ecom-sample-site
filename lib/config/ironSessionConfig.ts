import { IronSessionData, SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: 'user_session_vk',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
     httpOnly: true,
    sameSite: 'lax',
    path: '/', // this is crucial
  },
};

// -----------------------------------------------------------------------------------------------------------------------//

// MODULE -DECLARATION
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string,
      email: string,
      name: string,
      role: string,
    },
    isAuthenticated:boolean;
  }
}

// CONSTANT - DECLARATION
export const defaultIronSession:IronSessionData = {
  isAuthenticated:false,
}