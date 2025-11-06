"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <p>Loading...</p>

  if (!session) {
    router.push("/(auth)/login")
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome back, {session.user?.name}!</p>
    </div>
  )
}
