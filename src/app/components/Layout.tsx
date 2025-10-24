"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push("/");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Cambria']">
      {/* Header */}
      <header className="bg-yellow-300 border-b border-black h-16 flex items-center justify-between px-10 py-12 shadow-md">
        <div className="flex items-center gap-6">
          <img
            src="/image/logo simkarin.png"
            alt="Logo"
            className="w-30 h-30 rounded-sm object-cover"
          />

          {/* Clickable Title */}
          <Link
            href={
              pathname.startsWith("/fulltime-employee")
                ? "/fulltime-employee"
                : pathname.startsWith("/parttime-employee")
                ? "/parttime-employee"
                : "/"
            }
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800 hover:text-yellow-700 transition"
          >
            {pathname === "/" || pathname === "/dashboard"
              ? "Dashboard"
              : pathname.startsWith("/fulltime-employee")
              ? "Fulltime Employee"
              : pathname.startsWith("/parttime-employee")
              ? "Parttime Employee"
              : pathname.startsWith("/reminder")
              ? "Reminder"
              : "PT. Lancang Kuning Sukses HR Database"}
          </Link>
        </div>

        {/* Navbar Icons */}
        <div className="flex items-center gap-2">
          <Link href="/reminder">
            <button
              aria-label="reminder"
              className="p-2 rounded-full hover:bg-yellow-200 transition"
            >
              <FiBell size={20} />
            </button>
          </Link>
          <Link href="/profile">
            <button
              aria-label="profile"
              className="p-2 rounded-full hover:bg-yellow-200 transition"
            >
              <FiUser size={20} />
            </button>
          </Link>
          <button
            aria-label="logout"
            onClick={() => setShowLogoutModal(true)}
            className="ml-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiLogOut className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Logout Confirmation
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will be redirected to the
              home page.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Body Layout */}
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-300 p-5 flex flex-col gap-2 font-[Cambria]">
          <Link href="/">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname === "/" || pathname === "/dashboard"
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                🏠
              </div>
              <span
                className={`text-sm text-black ${
                  pathname === "/" || pathname === "/dashboard"
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link href="/fulltime-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/fulltime-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/fulltime-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Fulltime Employee
              </span>
            </div>
          </Link>

          <Link href="/parttime-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/parttime-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/parttime-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Parttime Employee
              </span>
            </div>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
