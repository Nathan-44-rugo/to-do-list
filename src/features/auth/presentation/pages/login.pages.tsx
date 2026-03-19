'use client'

import { X, AlertCircle } from "lucide-react";
import LoginForm from "../components/loginForm.components";
import LoginHooks from "../hooks/login.hooks";

export default function SignUpPage() {
    const { submit, formRef, visibleErrors, removeToast } = LoginHooks()

    return (
        <div className="relative min-h-screen bg-gray-50">
            <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 w-full max-w-xs">
                {visibleErrors && visibleErrors.map((e, index) => (
                    <div 
                        key={`${e}-${index}`} 
                        className="flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow animate-in slide-in-from-right-5 duration-300"
                        role="alert"
                    >
                        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        
                        <div className="ms-3 text-sm font-normal">{e}</div>
                        
                        <button 
                            onClick={() => removeToast(index)}
                            type="button" 
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center h-dvh">
                <LoginForm submit={submit} formRef={formRef} />
            </div>
        </div>
    )
}