import { UserRepositories } from "../repositories/user.repositories";

export class Login{
    constructor(private readonly repository: UserRepositories){}

    async execute(username: string, password: string){
        return await this.repository.loginUser(username, password)
    }
}

export class Logout{
    constructor(private readonly repository: UserRepositories){}

    async execute(){
        return await this.repository.logoutUser()
    }
}

export class CurrentAuthUser{
    constructor(private readonly repository: UserRepositories){}

    async execute(authToken: string){
        return await this.repository.getCurrentUser(authToken)
    }
}

export class RefreshAuth{
    constructor(private readonly repository: UserRepositories){}

    async execute(refreshToken: string){
        return await this.repository.refreshAuthSession(refreshToken)
    }
}