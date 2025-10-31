"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import Layout from "../components/Layout";

export default function ParttimeEmployeePage() {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

  return (
    <Layout>
      {/* Main konten */}
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

              <div className="flex gap-3 relative">
                {/* Division */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                    onClick={() => {
                      setShowDivision(!showDivision);
                      setShowDepartment(false);
                    }}
                  >
                    Division
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        showDivision ? "rotate-180" : ""
                      }`}
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

                {/* Department */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                    onClick={() => {
                      setShowDepartment(!showDepartment);
                      setShowDivision(false);
                    }}
                  >
                    Department
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        showDepartment ? "rotate-180" : ""
                      }`}
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

          {/* Table */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 w-12">No</th>
                  <th className="border border-gray-300 px-4 py-2">NIK</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Division</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Department
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Position</th>
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
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link href={`/manajemen-it/parttime-employee/detail/${i + 1}`}>
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
    </Layout>
  );
}
