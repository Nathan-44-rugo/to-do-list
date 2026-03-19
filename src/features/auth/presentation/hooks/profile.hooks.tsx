'use client';

import { useState, useEffect } from "react";
import { User } from "../../domain/entities/user.entities";
import { logout } from '../../di/modules'


export function useProfileDetails(initialUser: User | undefined | null) { 
    const [user, setUser] = useState<User | undefined | null>(initialUser);
    const [loading, setLoading] = useState<boolean>(false); 

    const signOut = async () => {
        try {
            await logout.execute()
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    useEffect(() => {
        let mounted = true
        const setUserProfile = async() => {
            setLoading(true)
            setUser(initialUser);
            if (mounted) setLoading(false)
        }
        
        setUserProfile()
        return ()=>{mounted=false}  
    }, [initialUser]);

    return { user, loading, signOut };
}