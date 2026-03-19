'use server'

import { cookies } from "next/headers"


export async function setSession(accessToken: string){
    const cookieStore = await cookies()
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60,
        path: "/",
    })
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}

export async function getCookie() {
    const cookieStore = await cookies()
    return cookieStore.get("accessToken")?.value
}





