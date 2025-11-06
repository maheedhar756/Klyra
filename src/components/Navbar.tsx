"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">
        <Link href="/">Klyra</Link>
      </h1>
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/(auth)/login" })}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  )
}
