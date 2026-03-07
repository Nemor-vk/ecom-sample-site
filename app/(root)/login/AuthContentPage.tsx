'use client'

import AuthForm from '@/components/AuthForm'
import { signInWithCredentials, signUp } from '@/lib/auth'
import { signInSchema, signUpSchema } from '@/lib/validations'
import React, { useEffect } from 'react'
import { LOGIN_TYPE } from './page'
import { Session, User } from 'next-auth'
import { redirect, useSearchParams } from 'next/navigation'

const AuthContentPage = ({loginType, session}:{loginType:LOGIN_TYPE, session:Session | null}) => {

    //  Redirect Logic after login
    const searchParams = useSearchParams();
    const redirect_to = searchParams.get('redirect_to')
    if(session && redirect_to) {
      redirect(redirect_to)
    } else if (session) {
      redirect('/')
    }

  
  return (
    <>
      {loginType === 'SIGNIN' 
        ? <AuthForm formType={'SIGNIN'} defaultValues={{email:'', password:''}} onSubmit={signInWithCredentials} schema={signInSchema}/>
        : <AuthForm formType={'SIGNUP'} defaultValues={{fullName:'', email:'', password:'', mobileNumber:''}} onSubmit={signUp} schema={signUpSchema}/>
      }
    </>
  )
}

export default AuthContentPage