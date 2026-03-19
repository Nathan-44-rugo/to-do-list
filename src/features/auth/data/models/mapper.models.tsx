import { User } from "@/features/auth/domain/entities/user.entities";
import { UserDTO } from "./user.models"

export class Mapper{
    static fromJson(json: UserDTO): User{
        return{
            id: json.id.toString(),
            username: json.username,
            email: json.email,
            password: json.password,
            firstName: json.firstName,
            lastName: json.lastName,
            gender: json.gender,
            profilePicture: json.image,
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
        }
    }

    static toJson(user: User): string{
        const data = {
            id: parseInt(user.id),
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            image: user.profilePicture,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        }

        return JSON.stringify(data)
    }
}