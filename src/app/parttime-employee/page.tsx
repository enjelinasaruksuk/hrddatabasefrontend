"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiBriefcase,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

export default function Page() {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

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
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
            Parttime Employee
          </h1>
        </div>

        <div className="flex items-center gap--5">
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
          <button
            aria-label="logout"
            className="ml-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-300 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
              🏠
            </div>
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
              📁
            </div>
            <span className="text-sm font-medium">Fulltime Employee</span>
          </div>

          <div className="flex items-center gap-3 bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center text-black text-xl">
              📁
            </div>
            <span className="text-sm font-semibold">Parttime Employee</span>
          </div>
        </aside>


        {/* Main Content */}
        <main className="flex-1 bg-white p-8 relative">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <h2 className="text-xl font-semibold">Parttime Employee</h2>
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
                <Link href="/parttime-employee/add">+ Add</Link>
              </button>

              {/* Dropdown Group */}
              <div className="flex gap-2 relative">
                {/* Division Dropdown */}
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
                      className={`transition-transform duration-200 ${showDivision ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {showDivision && (
                    <ul className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {["Overhead", "Manufacturing", "EPC 1", "EPC 2"].map(
                        (div, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-sm"
                          >
                            {div}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>

                {/* Department Dropdown */}
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
                      className={`transition-transform duration-200 ${showDepartment ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {showDepartment && (
                    <ul className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {["HRD", "Finance", "Business Development"].map(
                        (dept, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-sm"
                          >
                            {dept}
                          </li>
                        )
                      )}
                    </ul>
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
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 w-12">No</th>
                  <th className="border border-gray-300 px-4 py-2">NIK</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Division</th>
                  <th className="border border-gray-300 px-4 py-2">Department</th>
                  <th className="border border-gray-300 px-4 py-2">Position</th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-28">
                    Action
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Detail
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>

                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center gap-3">
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
