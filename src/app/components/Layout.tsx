"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiChevronDown,
  FiLogOut,
  FiBell,
  FiUser,
} from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="bg-yellow-300 border-b border-black h-16 flex items-center justify-between px-10 py-12 shadow-md">
        <div className="flex items-center gap-6">
        <img
  src="/image/logo2.png"
  alt="Logo"
  className="w-40 h-40 rounded-sm object-cover"
/>

          <h1 className="text-2xl font-bold text-gray-800">
            PT. Lancang Kuning Sukses HR Database
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="notifications"
            className="p-2 rounded-full hover:bg-yellow-200"
          >
            <FiBell size={20} />
          </button>
          <button
            aria-label="profile"
            className="p-2 rounded-full hover:bg-yellow-200"
          >
            <FiUser size={20} />
          </button>
          <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-full shadow flex items-center gap-2 hover:bg-red-700">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* ===== BODY WRAPPER ===== */}
      <div className="flex flex-1">
        {/* ===== SIDEBAR ===== */}
        <aside className="w-64 bg-yellow-300 p-5 flex flex-col gap-2 border-r border-gray-400">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer"
          >
            <FiHome />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <div>
            <button
              onClick={() => setShowDivision(!showDivision)}
              className="flex items-center justify-between w-full hover:bg-yellow-200 p-2 rounded cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FiUsers />
                <span className="text-sm font-semibold">Fulltime Employee</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  showDivision ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDivision && (
              <div className="pl-10 mt-1 flex flex-col gap-1">
                <Link
                  href="/employee/fulltime"
                  className="text-sm hover:text-red-600"
                >
                  Kelola Data
                </Link>
                <Link
                  href="/employee/fulltime/view"
                  className="text-sm hover:text-red-600"
                >
                  Lihat Data
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowDepartment(!showDepartment)}
              className="flex items-center justify-between w-full hover:bg-yellow-200 p-2 rounded cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FiBriefcase />
                <span className="text-sm font-semibold">Parttime Employee</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  showDepartment ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDepartment && (
              <div className="pl-10 mt-1 flex flex-col gap-1">
                <Link
                  href="/employee/parttime"
                  className="text-sm hover:text-red-600"
                >
                  Kelola Data
                </Link>
                <Link
                  href="/employee/parttime/view"
                  className="text-sm hover:text-red-600"
                >
                  Lihat Data
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
