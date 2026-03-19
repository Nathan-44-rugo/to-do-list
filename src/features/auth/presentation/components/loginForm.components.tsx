'use client'
import Link from 'next/link'
import { RefObject } from 'react'

type LoginParams = {
    submit: (formData: FormData)=> void | Promise<void>,
    formRef: RefObject<HTMLFormElement | null>
}
export default function LoginForm({submit, formRef}: LoginParams){
    return(
        <div className="flex flex-col gap-5 items-center p-10 font-mono bg-white h-full w-fit">

            <div className='flex flex-col items-center gap-2'>
                <span className="font-bold text-2xl text-gray-900">Login</span>
                <span className='font-medium text-md text-gray-600'>Get access to over 190,000 quality products</span>
            </div>
            <div className="border border-neutral-200 rounded-xl p-5 h-fit w-fit">
                <form ref={formRef} action={submit} className="flex flex-col gap-10 h-full p-10">
                    <div className='flex flex-col gap-6'>
                        <div className='relative'>
                            <input type="text" name="username" placeholder="Enter your username" className="peer text-sm border rounded-lg border-gray-200 p-2 w-full h-fit focus:outline-none focus:border-[1.5px] focus:border-red-600 placeholder-transparent focus:placeholder-gray-400 transition-all"></input>
                            <label htmlFor='username' className='absolute left-3 top-2 px-1 pointer-events-none text-sm font-medium text-gray-500 transition-all duration-300 
                                peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white'
                            >Username
                            </label> 
                        </div>
                        <div className='relative'>
                            <input type="password" name="password" placeholder="Enter your password"className="peer text-sm border rounded-lg border-gray-200 p-2 w-full h-fit focus:outline-none focus:border-[1.5px] focus:border-red-600 placeholder-transparent focus:placeholder-gray-400 transition-all"></input>
                            <label htmlFor='password' className='absolute left-3 top-2 px-1 pointer-events-none z-10 text-sm font-medium text-gray-500 transition-all duration-300 
                                peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white'
                            >Password
                            </label> 
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-5'>
                        <button type="submit" className="h-fit w-20 p-2 bg-red-900 text-sm text-white rounded-lg hover:bg-red-500 transition-colors">Login</button>
                        <div className="flex flex-row text-sm text-gray-400 gap-[1]">
                            <span>If you don`t have an account, </span>
                            <Link href='/' className='underline hover:text-red-500 transition-colors'>signup here!</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}