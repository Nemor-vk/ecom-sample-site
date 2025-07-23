'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from './ui/button';
import { Input } from './ui/input'
import { SITE_ROLES, STORE_NAME } from '@/app/constants'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import { Session, User } from 'next-auth'
import { callUpdateIronSessionApi } from '@/lib/clientLogin'
import { signOut } from 'next-auth/react'


interface Props<T extends FieldValues> {
    defaultValues: T,
    onSubmit:(data:T) => Promise<{success:boolean, error?:string, user?:User}>,
    formType: 'SIGNIN'|'SIGNUP',
    schema: ZodType<T>
}

const AuthForm = <T extends FieldValues>({formType, defaultValues, onSubmit, schema}: Props<T>) => {

    const router = useRouter();

    // 1. Define your form.
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema, defaultValues),
        defaultValues: defaultValues as DefaultValues<T>
    })

    const handleSubmit: SubmitHandler<T> = async(data) => {

        console.log('form submitted -', data)

        const result = await onSubmit(data);

        if(result.success) {

            // const {isAuthenticated, user} = await getIronSessionDecodedCookie();
            // console.log("result before login :: IRON COOKIE -", user)
            const ironSessionStatus = await callUpdateIronSessionApi();
            console.log("Response after login :", ironSessionStatus)
 
            if(ironSessionStatus == false) {
                signOut();
                toast.error(`Error ${formType === 'SIGNIN' ? 'Signin-In' : 'Signin-Up'}`, {
                description: `${result.error}`
                })
            }
                    
            // toast.success('Success', {
            //     description: formType === 'SIGNIN' ? 'You have successfully Signed In' : 'Account Created Succcessfully'
            // })

            //  setTimeout(() => {
            //     //  router.push('/');

            //      router.refresh(); // ✅ ensures the new page is re-fetched
            // }, 2000); // ⏱️ 3-second delay


        } else {
            toast.error(`Error ${formType === 'SIGNIN' ? 'Signin-In' : 'Signin-Up'}`, {
                description: `${result.error}`
            })
        }

  }

  return (
    <div className='capitalize lg:w-[450px] bg-background border-2 px-8 py-5 rounded-md mt-2'>
        <div className='mb-8 mt-4 flex flex-col justify-center items-center'>
            <h1 className='capitalize'>{formType === 'SIGNIN' ? 'Welcome to Vivek Store' : 'Create New Account'}</h1>
            <span className='capitalize'>{formType === 'SIGNIN' ? 'Sign-In to access your Account' : 'Enter your details to create new Account'}</span>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {Object.keys(defaultValues).map((field) => (
                <FormField
                key={field}
                control={form.control}
                name = {field as Path<T>}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className='capitalize'>{field.name}</FormLabel>
                    <FormControl>
                        <Input  type="text" {...field} required autoComplete='true' />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                /> 
            ))}
            <Button type="submit" className="mt-2 cursor-pointer w-full">Login</Button>
        </form>
        </Form>

        <div className='my-2.5 text-sm text-center'>
            <p className='capitalize'>{formType === 'SIGNIN' 
                ? `New to ${STORE_NAME}?` 
                : `Already have an account?`}
            </p>
        </div>
    </div>
  )
}

export default AuthForm