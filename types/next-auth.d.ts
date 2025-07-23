// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {

    interface AuthCredentials {
        email: string,
        password: string,
        fullName: string,
        mobileNumber: string,
    }

//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       // Add more custom fields if needed
//     };
//   }

  interface User {
    id: string;
    name: string;
    email: string;
    status:string,
    role:string
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     name: string;
//     email: string;
//     // Extend with token fields you're adding in jwt() callback
//   }
}