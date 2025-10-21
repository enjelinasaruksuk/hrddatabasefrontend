"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

export default function EmployeeDetail() {
  const [isClicked, setIsClicked] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDownload = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    router.push("/home");
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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800">
            Employee Form
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/notifications">
            <button
              aria-label="notifications"
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
            onClick={handleLogoutClick}
            className="ml-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiLogOut className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Logout Confirmation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will be redirected to the home page.
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

      {/* Body */}
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-300 p-5 flex flex-col gap-2 font-[Cambria]">
          <Link href="/dashboard">
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
              pathname === "/dashboard" 
                ? "bg-yellow-200 shadow-sm" 
                : "hover:bg-yellow-200"
            }`}>
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                🏠
              </div>
              <span className={`text-sm text-black ${
                pathname === "/dashboard" ? "font-semibold" : "font-medium"
              }`}>
                Dashboard
              </span>
            </div>
          </Link>

          <Link href="/fulltime-employee">
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
              pathname?.startsWith("/fulltime-employee") 
                ? "bg-yellow-200 shadow-sm" 
                : "hover:bg-yellow-200"
            }`}>
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span className={`text-sm text-black ${
                pathname?.startsWith("/fulltime-employee") ? "font-semibold" : "font-medium"
              }`}>
                Fulltime Employee
              </span>
            </div>
          </Link>

          <Link href="/parttime-employee">
            <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
              pathname?.startsWith("/parttime-employee") 
                ? "bg-yellow-200 shadow-sm" 
                : "hover:bg-yellow-200"
            }`}>
              <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
                📁
              </div>
              <span className={`text-sm text-black ${
                pathname?.startsWith("/parttime-employee") ? "font-semibold" : "font-medium"
              }`}>
                Parttime Employee
              </span>
            </div>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-8 relative">
          <div className="max-w-6xl w-full">
            {/* Header Section with PDF Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <h2 className="text-xl font-semibold">Employee Form</h2>
              </div>
              <button
                onClick={handleDownload}
                className={`${
                  isClicked ? "bg-green-500" : "bg-green-600"
                } hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded shadow transition`}
              >
                {isClicked ? "✔️ PDF" : "⬇️ PDF"}
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-[300px_1fr] gap-8">
              {/* Left column with photo */}
              <div className="flex flex-col items-start">
                <div className="w-full h-80 bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Photo</span>
                </div>
              </div>

              {/* Right column with all information */}
              <div className="space-y-6">
                {/* Biodata Section */}
                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">
                    Biodata
                  </h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">Name:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Biological Mothers Name:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Address:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Religion:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Date Of Birth:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Age:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Place Of Birth:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Marital Status:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Phone Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Identity Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Last Education:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                  </div>
                </section>

                {/* Employment Information Section */}
                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">
                    Employment Information
                  </h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">NIK:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">NPWP:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Account Number:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Division:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Date On Join:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Department:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Date Of End:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Position:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">MCU History:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Training List:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                  </div>
                </section>

                {/* Payroll Information Section */}
                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">
                    Payroll Information
                  </h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">All In Salary:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Fixed Allowance:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Basic Salary:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">Irregular Allowance:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                  </div>
                </section>

                {/* Employee Benefit Section */}
                <section>
                  <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 mb-3">
                    Employee Benefit
                  </h3>
                  <div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium">BPJS Employment:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                    <p className="font-medium">BPJS Health:</p>
                    <p className="bg-yellow-100 px-3 py-1.5 rounded"></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}