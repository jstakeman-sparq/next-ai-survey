"use server"

import { signOut, signIn } from "@/auth"

export async function handleSignOut() {
  console.log("Sign out requested")
  try {
    await signOut()
  } catch (error) {
    console.error('SignOut error:', error)
    // Even if server signout fails, client will handle redirect
  }
}

export async function handleSignIn(callbackUrl?: string) {
  console.log("Sign in requested with callback:", callbackUrl)
  await signIn("google", { callbackUrl: callbackUrl || "/admin" })
}