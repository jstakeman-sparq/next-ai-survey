"use server"

import { signIn, signOut } from "@/auth"

export async function handleSignOut() {
  await signOut({ redirectTo: "/admin/login" })
}

export async function handleSignIn(callbackUrl?: string) {
  await signIn("google", { redirectTo: callbackUrl || "/admin" })
}