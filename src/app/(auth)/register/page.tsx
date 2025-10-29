"use client"
import React, { useState } from "react"
import { registerUser } from "../../../services/authService"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      router.push("/(auth)/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-5">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
        <h1 className="text-xl font-semibold text-center">Register</h1>
        <label className="block">Name</label>
        <input type="text" placeholder="Name" className="border p-2 w-full rounded" onChange={handleChange} required />
        <label className="block">Email</label>
        <input type="email" placeholder="Email" className="border p-2 w-full rounded" onChange={handleChange} required />
        <label className="block">Password</label>
        <input type="password" placeholder="Password" className="border p-2 w-full rounded" onChange={handleChange} required />
        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 disabled:opacity-50"
        >
          { loading ? "Registering..." : "Register" }
        </button>
      </form>
    </div>
  );
}