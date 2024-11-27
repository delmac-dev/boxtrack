"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react";

export function Exit() {
    return (
      <button onClick={() => signOut({redirectTo: "/login"})}>
        <LogOut />
      </button>
    )
  }