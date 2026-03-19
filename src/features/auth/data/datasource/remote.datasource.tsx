import { Mapper } from '../models/mapper.models'
import { UserDTO } from '../models/user.models'
import { User } from '../../domain/entities/user.entities'
import { deleteCookie } from '../../lib/session.lib'

export class RemoteSource{
    private baseUrl = process.env.NEXT_PUBLIC_PRODUCT_LISTING_API

    async login(username: string, password: string): Promise<User | Error>{
        try {
                const res = await fetch(`${this.baseUrl}auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        
                        username: username,
                        password: password,
                        expiresInMins: 30,
                    }),
                    })

                if (!res.ok){
                    if (res.status == 400) throw Error("Bad Request")
                }

                const data: UserDTO = await res.json()
                const user = Mapper.fromJson(data)
                return user

        } catch (error) {
            return error as Error
        }
    }

    async logout(): Promise<void>{
        await deleteCookie()
    }

    async getCurrentAuthUser(authToken: string): Promise<User | null>{
        try {
            const res = await fetch(`${this.baseUrl}auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }, 
                credentials: 'include'
            })

            if (!res.ok){
                    throw Error("Unknown Error")
                }

            const data: UserDTO = await res.json()
            const user = Mapper.fromJson(data)
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async refreshSession(refreshToken: string): Promise<Pick<User, 'accessToken' | 'refreshToken'> | null>{
        try {
            const res = await fetch(`${this.baseUrl}auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                    expiresInMins: 30,
                }),
                credentials: 'include'
                })

            if (!res.ok){
                    throw Error("Unknown Error")
                }

            const data: UserDTO = await res.json()
            const user = Mapper.fromJson(data)
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }
}