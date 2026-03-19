import Profile from "@/features/auth/presentation/pages/profile.pages"; 
import { getCurrentUser } from "@/features/auth/di/modules"; 
import { User } from "@/features/auth/domain/entities/user.entities"
import { redirect } from "next/navigation";
import { getCookie } from "@/features/auth/lib/session.lib";

export default async function ProfilePage() {

    const authToken = await getCookie()
    let user: User | undefined | null;

    if (!authToken) {
        redirect('/login');
    }

    try {
        user = await getCurrentUser.execute(authToken);
    } catch (error) {
        console.error("Server-side user fetch failed:", error);
        redirect('/login'); 
    }
    
    return (
        <main className="min-h-screen">
            <Profile user={user} /> 
        </main>
    );
}