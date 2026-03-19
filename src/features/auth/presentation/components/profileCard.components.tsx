'use client'

import { User } from "../../domain/entities/user.entities"; // ADJUST PATH
import Image from "next/image"; 
import { Mail, User as UserIcon } from 'lucide-react'; 
import { useRouter } from "next/navigation";

const DetailItem = ({ Icon, label, value }: { Icon: React.ElementType, label: string, value: string }) => (
    <div className="flex font-mono items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <Icon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
        <div className="flex flex-col leading-tight">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-sm text-gray-800 font-medium">{value}</span>
        </div>
    </div>
);

export default function ProfileCard({ user }: { user: User}) {
    const { push } = useRouter()
    return (
        <div className="flex font-mono justify-center items-start min-h-screen w-full p-4 bg-gray-50">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl mt-10 overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-100 text-center bg-gray-50">
                    <div className="relative mx-auto mb-3 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-green-500">
                        <Image 
                            src={user.profilePicture || '/default-avatar.png'} 
                            alt={`${user.firstName} ${user.lastName}'s Profile Picture`} 
                            fill={true}
                            style={{objectFit: "cover"}}
                            sizes="fill"
                            loading="eager"
                        />
                    </div>
                    
                    <span className="block text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</span>
                    <span className="text-sm text-gray-500 block mt-0.5">@{user.username}</span>
                </div>

                <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">User Information</h3>
                    
                    <DetailItem Icon={Mail} label="Email" value={user.email} />
                    <DetailItem Icon={UserIcon} label="Gender" value={user.gender} />                    
                    <DetailItem Icon={UserIcon} label="User ID" value={user.id} />
                </div>

                <div className="p-6 pt-0">
                    <button
                        onClick={() => {push('/api/auth/logout')}}
                        title='Logout' 
                        className='w-full py-3 border border-red-400 text-red-600 rounded-lg text-sm font-semibold bg-white hover:bg-red-50 hover:text-red-700 transition-colors shadow-sm'
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}