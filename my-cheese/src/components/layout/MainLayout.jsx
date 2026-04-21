'use client';
import Link from 'next/link';
import {
  FaHome, FaUserFriends, FaCompass, FaVideo,
  FaInbox, FaRegUser, FaPlus, FaUpload
} from 'react-icons/fa';
import { useAuth } from '@/contexts/authContext';
import AuthModal from "@/components/auth/AuthModal";
import { use } from 'react';

export default function MainLayout({ children }) {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-60 border-r fixed h-full overflow-y-auto">
                <div className="p-4">
                    <Link href="/" className="text-xl font-bold flex items-center">
                        <span className="text-red-500 mr-1">My Cheese</span>
                    </Link>
                </div>

                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                                <FaHome className="text-xl mr-3" />
                                <span>For You</span>
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <Link href="/following" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                                    <FaUserFriends className="text-xl mr-3" />
                                    <span>Following</span>
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link href="/explore" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                                <FaCompass className="text-xl mr-3" />
                                <span>Explore</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/live" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                                <FaVideo className="text-xl mr-3" />
                                <span>Live</span>
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <Link
                                    href="/profile"
                                    className='mx -2 flex items-center rounded-md p-3 hover:bg-gray-100'
                                >
                                    <FaRegUser className="text-xl mr-3" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="border-t mt-4 pt-4 px-2">
                    <p className="text-sm text-gray-500 px-3 mb-2">Suggested accounts</p>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                            <div>
                                <p className="text-sm font-semibold">User {index + 1}</p>
                                <p className="text-xs text-gray-500">@user{index + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && !isAuthenticated ? (
                    <div className="px-3 py-4 mt-2">
                        <p className="text-sm text-gray-500 mb-4">Log in to follow creators, like videos, and view comments.</p>
                        <button 
                            onClick={openAuthModal}
                            className="w-full py-2 px-4 border rounded-md font-medium mb-2 hover:bg-gray-50"
                        >
                            Log in
                        </button>
                        <button
                            onClick={openAuthModal}
                            className="w-full py-2 px-4 bg-red-500 text-white rounded-md font-medium hover:bg-red-600">
                            Sign up
                        </button>
                    </div>
                ) : (
                    !loading && (
                        <div className="px-3 py-4 mt-2">
                            <p className='mb-2 text-sm text-gray-500'> Logged in as</p>
                            <p className='mb-4 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium'>
                                {user?.username || user?.email || "User"} 
                            </p>
                            <button
                                onClick={logout}
                                className="w-full py-2 px-4 bg-gray-900 text-white rounded-md font-medium hover:bg-black"
                            >
                                Logout
                            </button>
                        </div>
                    )
                )} 
                        
                <div className="border-t mt-4 pt-4 px-3 text-sm text-gray-500">
                    <p className="mb-2">© 2024 My Cheese</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-60">
                <div className="max-w-[1150px] mx-auto">
                    {/* Header with Search */}
                    <header className="flex items-center justify-between px-4 border-b h-16">
                        <div className='w-1/3'></div>

                        <div className='w-1/3'>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search accounts and videos"
                                    className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4"
                                />
                                <FaCompass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div className='w-1/3 flex justify-end items-center space-x-4'>
                            {isAuthenticated && (
                                <Link href="/upload">
                                    <button className="flex items-center px-3 py-1 hover:bg-gray-50 border rounded-md">
                                        <FaUpload className="mr-2" />
                                        Upload
                                    </button>
                                </Link>
                            )}

                            {!loading && !isAuthenticated ? (
                                <button
                                    onClick={openAuthModal}
                                    className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600"
                                >
                                    Log in
                                </button>
                            ) : (
                                !loading && (
                                    <div className='flex items-center gap-3'>
                                        <span className='text-sm text-gray-500'>
                                            {user?.username || user?.email || "User"}
                                        </span>
                                        <button
                                            onClick={logout}
                                            className="text-white px-4 py-1 rounded-md hover:bg-gray-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )
                            )}

                            {/* Change 2: Updated Header Login Button */}
                            <Link href="/login">
                                <button className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600">
                                    Log in
                                </button>
                            </Link>
                        </div>

                        <div>
                            <Link href='/profile' className='flex items-center p-3 hover:bg-gray-100 rounded-md mx-2'>
                                <FaRegUser className='text-xl mr-3' />
                                <span>Profile</span>
                            </Link>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}