import { RemoteSource } from "../data/datasource/remote.datasource";
import { UserRepository } from "../data/repositories/user.repositories";
import { Login, CurrentAuthUser, RefreshAuth, Logout } from "../domain/usecases/user.usecases";

const dataSource = new RemoteSource()

const userRepository = new UserRepository(dataSource)

const login = new Login(userRepository)

const logout = new Logout(userRepository)

const getCurrentUser = new CurrentAuthUser(userRepository)

const refresh = new RefreshAuth(userRepository)

export { login, getCurrentUser, refresh, logout }
