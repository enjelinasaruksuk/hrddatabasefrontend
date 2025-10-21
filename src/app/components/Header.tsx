"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="relative bg-yellow-300 border-b border-black h-16 flex items-center justify-between px-10 shadow-md">
      {/* Logo di kiri */}
      <div className="flex items-center gap-3">
        <Image
          src="/image/logo simkarin.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-sm object-cover"
        />
      </div>

      {/* Judul di tengah */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
        Fulltime Employee
      </h1>

      {/* Tombol kanan */}
      <div className="flex items-center gap-4">
        <button
          aria-label="notifications"
          className="p-2 rounded-full hover:bg-yellow-200"
        >
          🔔
        </button>
        <button
          aria-label="profile"
          className="p-2 rounded-full hover:bg-yellow-200"
        >
          👤
        </button>
        <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-full shadow">
          Logout
        </button>
      </div>
    </header>
  );
}
