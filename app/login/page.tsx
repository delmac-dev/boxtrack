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
                    <input name="password" type="password" className="input-field"/>
                </label>
                <button className="button">
                    LOGIN
                </button>
            </form>
        </main>
    )
}