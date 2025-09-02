"use server"

import { signOut, signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function handleSignOut() {
  console.log("Sign out requested")
  await signOut({ redirectTo: "/" })
}

export async function handleSignIn(callbackUrl?: string) {
  console.log("Sign in requested with callback:", callbackUrl)
  await signIn("google", { callbackUrl: callbackUrl || "/admin" })
}