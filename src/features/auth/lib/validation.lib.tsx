import * as z from 'zod'

const LoginSchema = z.object({
    username: z.string().min(1, {error: "Username must be atleast one character"}).trim(),
    password: z.string().min(1, {error: "Password must be atleast one character"}).trim(),
})

type SessionPayload = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    iat: number,
    exp: number
}

export { LoginSchema }
export type {  SessionPayload }
