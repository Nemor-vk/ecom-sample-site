import { findUserByEmailWithPass } from "@/prisma/repository/userRepo";
import { compare } from "bcryptjs";
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      credentials: {
        email: {
        type: "email",
        label: "Email",
        },
        password: {
        type: "password",
        label: "Password",
        placeholder: "*****",
        },
      },
      authorize: async (credentials) => {

        console.log("Triggered Authorised file")

        if (!credentials?.email || !credentials?.password) {
          console.log("email or pass not present")
          throw new Error("Please enter Credentials!")
        }

        const user = await findUserByEmailWithPass(credentials.email as string);

        if (!user || !user.password) {
          console.log("user is not present")
          throw new Error("User Not Registered! Create Account first");
        }

        const isValid = await compare(credentials.password as string, user.password);

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        console.log("✅ Returning user from authorize:", user);

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          status:'online',
          role: user.role.name
        } as User;
      },
    }),
  ],
  pages : {
    signIn : '/login'
  },
  callbacks : {
    async jwt({token, user}) {

      if(user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      // console.log('JWT callback token:', token);

      return token;
    },
    async session({session, token}) {

      if(session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }

      // console.log('Session callback session:', session);
      return session;
    }
  },
  jwt: {
    maxAge: 60 * 15 * 7, // 15 minutes
  }
})


export const { GET, POST } = handlers