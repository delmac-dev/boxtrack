"use client";

import Lock from "@/components/icons/lock";
import { signIn } from "next-auth/react";

export default function LoginPage () {
    const adminLogin = (formData: FormData) => {
        signIn("credentials", {...Object.fromEntries(formData), redirectTo: "/"})
    }

    return (
        <main className="w-full h-screen flex-center bg-secondary flex-col">
            <h2 className="text-6xl font-extrabold text-tertiary mb-10">BOXTRACK</h2>
            <form action={adminLogin} className="space-y-5">
                <label className="space-y-10 flex flex-col items-center">
                    <div className="bg-primary/40 size-24 flex-center rounded-tl-full rounded-tr-full rounded-bl-full border-primary border-4 rotate-45">
                        <Lock className="-rotate-45 size-10"/>
                    </div>
                    <input name="password" type="password" className="w-56 h-14 rounded-lg p-3 text-xl font-bold text-dark/80 focus-visible:outline-none text-center bg-primary/40 border-primary border-4"/>
                </label>
                <button className="w-56 h-12 bg-tertiary text-white text-lg font-extrabold rounded-md">
                    LOGIN
                </button>
            </form>
        </main>
    )
}