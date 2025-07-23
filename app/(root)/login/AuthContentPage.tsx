'use client'

import AuthForm from '@/components/AuthForm'
import { signInWithCredentials, signUp } from '@/lib/auth'
import { signInSchema, signUpSchema } from '@/lib/validations'
import React, { useEffect } from 'react'
import { LOGIN_TYPE } from './page'

const AuthContentPage = ({loginType}:{loginType:LOGIN_TYPE}) => {

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