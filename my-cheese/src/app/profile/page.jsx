export default function ProfilePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4"> User Profile</h1>
            <div className="bg-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-semibold">Username</h2>
                <p className="text-gray-600">@username</p>
                <div className="mt-4 flex space-x-4">
                    <div>
                        <span className="font-bold">0</span> Followering
                    </div>
                    <div>
                        <span className="font-bold">0</span> Followers
                    </div>
                    <div>
                        <span className="font-bold">0</span> Likes
                    </div>
                </div>
            </div>
        </div>
    );
}