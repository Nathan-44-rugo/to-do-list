import { User } from '../entities/user.entities'

export interface UserRepositories {
    loginUser(username:string, password:string): Promise<User | Error>
    logoutUser(): Promise<void>
    getCurrentUser(authToken: string): Promise<User | null>
    refreshAuthSession(refreshToken: string): Promise<Pick<User, 'accessToken' | 'refreshToken'> | null>
}