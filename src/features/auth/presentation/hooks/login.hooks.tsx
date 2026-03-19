'use client'

import { useRef, useState, useEffect } from "react"
import { login } from "../../di/modules"
import { LoginSchema } from "../../lib/validation.lib"
import { setSession } from "../../lib/session.lib"
import { useRouter } from "next/navigation"

export default function LoginHooks(){
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<Array<string> | null>()
    const { push, refresh } = useRouter()

    const [visibleErrors, setVisibleErrors] = useState<string[]>([])
    useEffect(() => {
        if (error && error.length > 0) {
            setVisibleErrors(prev => [...prev, ...error])
        }
    }, [error])

    useEffect(() => {
        if (visibleErrors.length > 0) {
            const timer = setTimeout(() => {
                setVisibleErrors(prev => prev.slice(1))
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [visibleErrors])

    const removeToast = (index: number) => {
        setVisibleErrors(prev => prev.filter((_, i) => i !== index))
    }

    async function submit(formData: FormData){
        setError(null)
        const username = formData.get('username') as string
        const password = formData.get('password') as string

        const isValidated = LoginSchema.safeParse({
            username: username,
            password: password
        })

        if (!isValidated.success){
            const flatErrors = isValidated.error.flatten().fieldErrors
            const fieldErrors = [flatErrors.username, flatErrors.password].filter(Boolean).flat() as string[]
            setError(error ? [...error, ...fieldErrors] : fieldErrors)
        }
        else{
            let success = false
            try {
                const res = await login.execute(username, password)
                if (res instanceof Error){
                    const errorMessages = Array.isArray(res.message) ? res.message : [res.message]
                    setError(error ? [...error, ...errorMessages] : errorMessages)
                } else {
                    await setSession(res.accessToken)
                    success = true
                }
                
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                const errorMessage = "Unexpected Error. Try again!"
                setError(error ? [...error, ...errorMessage]: [errorMessage])
            }

            if (success){
                push('/profile')
                refresh()
            }
        }
        
        formRef.current?.reset();
        if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        }

    }

    return { submit, formRef, error, removeToast, visibleErrors }
}