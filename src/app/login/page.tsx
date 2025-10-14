"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("hr"); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "hr") {
      router.push("/hr");
    } else if (role === "manajemen-it") {
      router.push("/manajemen-it");
    } else {
      alert("Invalid role selected!");
    }

    console.log({ username, password, role });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FFD54F] to-[#FFFFFF]">

      <div className="flex bg-white shadow-md rounded-2xl p-8 w-[750px]">
        <div className="flex flex-col items-center justify-center w-1/2 pr-6 border-r">
          <Image
            src="/image/simkarin-logo.jpg"
            alt="SIMKARIN Logo"
            width={400}
            height={550}
          />
        </div>

        <div className="flex flex-col w-1/2 pl-6">
          <div className="flex items-center mb-4">
            <Image
              src="/image/lks-logo.png"
              alt="Lancang Kuning Sukses"
              width={500}
              height={300}
            />
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Login to access the application.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="hr">HR</option>
              <option value="manajemen-it">Manajemen & IT</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#FDD835] text-black font-semibold py-2 rounded-lg shadow-lg hover:bg-[#FBC02D] transition-transform transform hover:scale-105"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
