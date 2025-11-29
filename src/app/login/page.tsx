"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("hr");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Tambahan: loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("⚠️ Username and password are required!");
      return;
    }

    if (password.length !== 8) {
      setError("⚠️ Password must be exactly 8 characters long!");
      return;
    }

    setError("");
    setLoading(true); // Set loading true

    try {
      // ✅ PERBAIKAN: URL yang benar
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`⚠️ ${data.message}`);
        setLoading(false);
        return;
      }

      // Simpan token dan data user
      localStorage.setItem("token", data.token); // ✅ Simpan token juga
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("username", data.username);

      // Arahkan ke halaman sesuai role
      if (data.role === "hr") {
        router.push("/dashboard");
      } else if (data.role === "manajemen-it") {
        router.push("/manajemen-it/dashboard");
      } else {
        setError("⚠️ Role tidak dikenal!");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err); // Tambahan: log error
      setError("⚠️ Server tidak merespon. Pastikan backend berjalan.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FFD54F] to-[#FFFFFF] font-[Cambria]">
      <div className="flex bg-white shadow-md rounded-2xl p-8 w-[750px]">
        {/* Bagian kiri logo */}
        <div className="flex flex-col items-center justify-center w-1/2 pr-6 border-r">
          <Image
            src="/image/simkarin-logo.jpg"
            alt="SIMKARIN Logo"
            width={400}
            height={550}
          />
        </div>

        {/* Bagian kanan form */}
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
            Login to access the SIMKARIN system
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              disabled={loading}
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-yellow-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={loading}
            >
              <option value="hr">HR</option>
              <option value="manajemen-it">Manajemen & IT</option>
            </select>

            {/* Pesan error */}
            {error && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FDD835] text-black font-semibold py-2 rounded-lg shadow-lg hover:bg-[#FBC02D] transition-transform transform hover:scale-105 font-[Cambria] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "LOADING..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}