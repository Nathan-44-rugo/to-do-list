import { UserRepositories } from '@/features/auth/domain/repositories/user.repositories'
import { RemoteSource as API } from '../datasource/remote.datasource'
import { User } from '../../domain/entities/user.entities'

export class UserRepository implements UserRepositories{
    constructor(private api: API){}

    async loginUser(username: string, password: string): Promise<User | Error> {
        return await this.api.login(username, password)
    }

    async logoutUser(): Promise<void> {
        return await this.api.logout()
    }

    async getCurrentUser(authToken: string): Promise<User | null> {
        return await this.api.getCurrentAuthUser(authToken)
    }

    async refreshAuthSession(refreshToken: string): Promise<Pick<User, 'accessToken' | 'refreshToken'> | null> {
        return await this.api.refreshSession(refreshToken)
    }
}