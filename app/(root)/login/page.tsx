import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from 'next/navigation'
import AuthContentPage from './AuthContentPage'
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { User } from 'next-auth';

export type LOGIN_TYPE = 'SIGNIN' | 'SIGNUP';
const LOGIN_VALUES = { SIGNIN :"SIGNIN", SIGNUP: 'SIGNUP'}

const page = async() => {

  const session:User = await auth();

  return (
    <div className='mt-5 flex justify-center items-center'>
        <Tabs defaultValue={LOGIN_VALUES.SIGNIN} className=" flex items-center">
        <TabsList className='w-fit lg:w-[400px] box-content p-1.5'>
            <TabsTrigger className='border-2 px-5' value={LOGIN_VALUES.SIGNIN}>Login</TabsTrigger>
            <TabsTrigger className='border-2 px-5' value={LOGIN_VALUES.SIGNUP}>SignUp</TabsTrigger>
        </TabsList>

        <TabsContent value={LOGIN_VALUES.SIGNIN}>
          <AuthContentPage loginType={LOGIN_VALUES.SIGNIN as LOGIN_TYPE} session={session} />
        </TabsContent>

        <TabsContent value={LOGIN_VALUES.SIGNUP}>
          <AuthContentPage loginType={LOGIN_VALUES.SIGNUP as LOGIN_TYPE} session={session} />
        </TabsContent>
        </Tabs>
    </div>
  )
}

// const AuthContentBox = ({loginType}:{loginType:LOGIN_TYPE}) => {
//   return (
//     <>
//       {loginType === 'SIGNIN' 
//         ? <AuthForm formType={'SIGNIN'} defaultValues={{email:'', password:''}} onSubmit={signInWithCredentials} schema={signInSchema}/>
//         : <AuthForm formType={'SIGNUP'} defaultValues={{fullName:'', email:'', password:''}} onSubmit={signUp} schema={signUpSchema}/>
//       }
//     </>
//   )
// }

export default page