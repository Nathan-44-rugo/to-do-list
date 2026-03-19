'use client'
import ProfileCard from "../components/profileCard.components";
import { useProfileDetails } from "../hooks/profile.hooks"; 
import ProfileCardSkeleton from "../components/profileSkeletonCard.components"
import { User } from "../../domain/entities/user.entities";


type Params = {
    user: User | undefined | null
}

export default function Profile({ user }: Params) {
    const { loading } = useProfileDetails(user); 
    

    if (loading) {
        return <ProfileCardSkeleton />;
    }

    if (!user) {
        return <div className="items-center p-10 text-center font-mono">Error loading profile. Please log in again.</div>;
    }

    return <ProfileCard user={user}/>;
}