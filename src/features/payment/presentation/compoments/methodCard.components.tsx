import { LoaderIcon } from 'lucide-react'

type MethodCardProps = {
    Logo: React.FC
    name: string
    description: string
    available: boolean
    loading?: boolean
    onClick?: () => void
}

export default function MethodCard({ Logo, name, description, available, loading, onClick }: MethodCardProps) {
    return (
        <button
            onClick={available ? onClick : undefined}
            disabled={!available || loading}
            className={`relative flex flex-col items-center gap-4 p-6 w-64 border-2 rounded-2xl font-mono transition-all
                ${ available
                    ? 'border-gray-200 hover:border-green-400 hover:shadow-md cursor-pointer bg-white'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                }
                ${ loading ? 'opacity-60' : '' }
            `}
        >
            {!available && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    Coming Soon
                </span>
            )}
            <div className="h-full flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col items-center gap-1 text-center h-full">
                <span className="text-sm font-semibold text-gray-900">{name}</span>
                <span className="text-xs text-gray-500 leading-relaxed">{description}</span>
            </div>
            {loading && (
                <LoaderIcon className="h-full size-4 animate-spin stroke-green-500" />
            )}
        </button>
    )
}