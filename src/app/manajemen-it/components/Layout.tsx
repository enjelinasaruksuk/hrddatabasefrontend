"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ===== Ambil jumlah data yang akan expire =====
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    async function fetchReminderCount() {
      try {
        const res = await fetch("http://localhost:5000/api/reminder/count");
        const data = await res.json();
        setNotifCount(data.total || 0);
      } catch (error) {
        console.log("Failed to fetch:", error);
      }
    }

    fetchReminderCount();
  }, []);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push("/"); // arahkan ke halaman utama setelah logout
  };

  const handleLogoutCancel = () => setShowLogoutModal(false);

  return (
    <div className="min-h-screen bg-gray-100 font-['Cambria']">
      {/* Header */}
      <header className="bg-gradient-to-b from-yellow-300 to-white border-b border-black h-16 flex items-center justify-between px-10 py-12 shadow-md">
        <div className="flex items-center gap-6">
          <img
            src="/image/logo simkarin.png"
            alt="Logo"
            className="w-30 h-30 rounded-sm object-cover"
          />
          {/* Clickable Title */}
          <Link
            href={
              pathname.startsWith("/manajemen-it/fulltime-employee")
                ? "/manajemen-it/fulltime-employee"
                : pathname.startsWith("/manajemen-it/parttime-employee")
                ? "/manajemen-it/parttime-employee"
                : pathname.startsWith("/manajemen-it/contract-employee")
                ? "/manajemen-it/contract-employee"
                : "/manajemen-it/dashboard"
            }
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800 hover:text-yellow-700 transition"
          >
            {pathname === "/manajemen-it/dashboard"
              ? "Dashboard"
              : pathname.startsWith("/manajemen-it/fulltime-employee")
              ? "Fulltime Employee"
              : pathname.startsWith("/manajemen-it/parttime-employee")
              ? "Parttime Employee"
              : pathname.startsWith("/manajemen-it/contract-employee")
              ? "Expired Contracts"
              : pathname.startsWith("/manajemen-it/reminder")
              ? "Reminder"
              : "PT. Lancang Kuning Sukses HR Database"}
          </Link>
        </div>

        {/* Navbar Icons */}
        <div className="flex items-center gap-2">
          <Link href="/manajemen-it/reminder" className="relative">
            <button
              aria-label="reminder"
              className="p-2 rounded-full hover:bg-yellow-200 transition"
            >
              <FiBell size={20} />
            </button>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full font-bold">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </Link>

          <Link href="/manajemen-it/profile">
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
              Are you sure you want to logout? You will be redirected to the home
              page.
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
        <aside className="w-64 bg-gradient-to-b from-yellow-300 to-white p-5 flex flex-col gap-2 font-[Cambria]">
          <Link href="/manajemen-it/dashboard">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname === "/manajemen-it/dashboard"
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                🏠
              </div>
              <span
                className={`text-sm text-black ${
                  pathname === "/manajemen-it/dashboard"
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link href="/manajemen-it/fulltime-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/manajemen-it/fulltime-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/manajemen-it/fulltime-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Fulltime Employee
              </span>
            </div>
          </Link>

          <Link href="/manajemen-it/parttime-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/manajemen-it/parttime-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/manajemen-it/parttime-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Parttime Employee
              </span>
            </div>
          </Link>

          <Link href="/manajemen-it/contract-employee">
            <div
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                pathname?.startsWith("/manajemen-it/contract-employee")
                  ? "bg-yellow-200 shadow-sm"
                  : "hover:bg-yellow-200"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                ⚠️
              </div>
              <span
                className={`text-sm text-black ${
                  pathname?.startsWith("/manajemen-it/contract-employee")
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                Expired Contracts
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
