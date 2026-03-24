export default function FollowingPage() {
    return (
        <div className="max-w-[550px] mx-auto py-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Following</h2>
            <p className="text-gray-500 mb-8">Follow accounts to see their latest videos.</p>

            <div className="grid grid-cols-5 gap-4 mb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-2"></div>
                        <p className="text-sm font-semibold">User {index + 1}</p>
                        <button className="mt-2 text-xs bg-red-500 text-white py-1 px-4 rounded-full">
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            <button className="border border-gray-300 text-gray-700 py-2 px-8 rounded-md font-medium">
                Find more accounts to follow
            </button>
        </div>
    );
}