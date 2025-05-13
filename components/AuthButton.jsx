"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <button
                type="button"
                onClick={() => signIn()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"      >
                Sign in
            </button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <img
                src={session.user.image}
                alt="User avatar"
                className="w-10 h-10 rounded-full border"
                title={session.user.name}
            />
            <button
                onClick={() => signOut()}
                className="text-sm text-red-500 hover:underline"
            >
                Sign out
            </button>
        </div>
    );
};

export default AuthButton;