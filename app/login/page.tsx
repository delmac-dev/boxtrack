import { Metadata } from "next";
import Login from "@/components/common/login";

export const metadata: Metadata = {
    title: "BoxTrack | Login",
    description: "Login to use the app",
};

export default function LoginPage () {
    return (
        <main className="w-full h-screen flex-center">
            <Login />
        </main>
    )
}