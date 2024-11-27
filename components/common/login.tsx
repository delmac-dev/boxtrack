"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login () {
    const adminLogin = (formData: FormData) => {
        signIn("credentials", {...Object.fromEntries(formData), redirectTo: "/"})
    }

    return (
        <form action={adminLogin} className=" space-y-2">
            <label className="block">
                <input name="password" type="password" className="w-48 h-10 rounded-sm border p-3"/>
            </label>
            <Button>Sign In</Button>
        </form>
    )
}