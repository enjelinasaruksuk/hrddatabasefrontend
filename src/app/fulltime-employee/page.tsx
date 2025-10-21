"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiBriefcase,
  FiUsers,
  FiLogOut,
  FiBell,
  FiUser,
} from "react-icons/fi";

export default function Page() {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
            Fulltime Employee
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
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <h2 className="text-xl font-semibold">Fulltime Employee</h2>
            </div>

            <input
              placeholder="Search with name or NIK..."
              className="border rounded-full px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                <Link href="/fulltime-employee/add">+ Add</Link>
              </button>

              <div className="flex gap-3 relative">
                {/* Division Button */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                    onClick={() => {
                      setShowDivision(!showDivision);
                      setShowDepartment(false);
                    }}
                  >
                    <FiBriefcase size={14} />
                    Division
                    <FiChevronDown
                      className={`transition-transform duration-200 ${showDivision ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showDivision && (
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                      <ul className="text-sm text-gray-700">
                        {["Overhead", "Manufacturing", "EPC 1", "EPC 2"].map(
                          (item) => (
                            <li
                              key={item}
                              className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Department Button */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                    onClick={() => {
                      setShowDepartment(!showDepartment);
                      setShowDivision(false);
                    }}
                  >
                    <FiUsers size={14} />
                    Department
                    <FiChevronDown
                      className={`transition-transform duration-200 ${showDepartment ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showDepartment && (
                    <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                      <ul className="text-sm text-gray-700">
                        {["HRD", "Finance", "Business Development"].map(
                          (item) => (
                            <li
                              key={item}
                              className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Excel
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 w-12">No</th>
                  <th className="border border-gray-300 px-4 py-2">NIK</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Division</th>
                  <th className="border border-gray-300 px-4 py-2">Department</th>
                  <th className="border border-gray-300 px-4 py-2">Position</th>
                  <th className="border border-gray-300 px-4 py-2 text-center w-28">
                    Action
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
                          <FiEdit size={16} />
                          <span>Edit</span>
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                          <FiTrash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link href={`/fulltime-employee/detail/${i + 1}`}>
                        <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}