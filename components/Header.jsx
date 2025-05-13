import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthButton from "./AuthButton";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-2">
                <Image
                     src="/logo.svg" 
                     alt="Logo" 
                     width={40} 
                     height={40} 
                />
                
                <span className="text-2xl font-bold text-blue-600">
                    TravelPlanner
                </span>
            </div>


            <div className="flex items-center gap-6 flex-wrap justify-end flex-grow">
                <Link href="/favorites" className="text-gray-700 hover:text-blue-500">
                    Favorites
                </Link>
                <span className="text-gray-700">Explore new places</span>


                <form className="w-full max-w-xs">
                    <label htmlFor="default-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search places...(Ex: New York, US)"
                            required
                        />
                    </div>
                </form>

                <AuthButton />
            </div>
        </header>
    );
};

export default Header;
