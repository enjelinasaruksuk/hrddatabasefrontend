"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import Layout from "../components/Layout";

// Interface disesuaikan dengan output backend
interface Employee {
  NIK: number;
  name: string;
  birth_place: string | null;
  age: number | null;
  phone_number: string | null;
  department_id: number | null;
  position: string | null;
  division_name?: string | null;
  department_name?: string | null;
}

// daftar division & department (bisa fetch dari backend)
const divisions = ["Overhead", "Manufacturing", "EPC 1", "EPC 2"];
const departments = ["HRD", "Finance", "Business Development"];

export default function FulltimeEmployeePage() {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // FETCH DATA
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim() !== "") params.append("keyword", search);
    if (divisionFilter) params.append("division", divisionFilter);
    if (departmentFilter) params.append("department", departmentFilter);

    const url = `http://localhost:5000/api/employees/type/fulltime?${params.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setEmployees(Array.isArray(data) ? data : []))
      .catch(() => setEmployees([]));
  }, [search, divisionFilter, departmentFilter]);

  // DELETE HANDLER
  const handleDelete = async (nik: number) => {
    if (!confirm("Are you sure to delete this employee?")) return;
    await fetch(`http://localhost:5000/api/employees/${nik}`, { method: "DELETE" });
    setEmployees(prev => prev.filter(emp => emp.NIK !== nik));
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">👤</div>
          <h2 className="text-xl font-semibold">Fulltime Employee</h2>
        </div>
        <input
          placeholder="Search with name or NIK..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-full px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/fulltime-employee/add">
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">+ Add</button>
          </Link>

          {/* Dropdowns */}
          <div className="flex gap-3 relative">

            {/* Division */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                onClick={() => { setShowDivision(!showDivision); setShowDepartment(false); }}
              >
                {divisionFilter || "Division"}
                <FiChevronDown className={`transition-transform duration-200 ${showDivision ? "rotate-180" : ""}`} />
              </button>
              {showDivision && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul className="text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-yellow-100 cursor-pointer font-semibold"
                      onClick={() => { setDivisionFilter(""); setShowDivision(false); }}
                    >
                      All Divisions
                    </li>
                    {divisions.map((item) => (
                      <li
                        key={item}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                        onClick={() => { setDivisionFilter(item); setShowDivision(false); }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Department */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                onClick={() => { setShowDepartment(!showDepartment); setShowDivision(false); }}
              >
                {departmentFilter || "Department"}
                <FiChevronDown className={`transition-transform duration-200 ${showDepartment ? "rotate-180" : ""}`} />
              </button>
              {showDepartment && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul className="text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-yellow-100 cursor-pointer font-semibold"
                      onClick={() => { setDepartmentFilter(""); setShowDepartment(false); }}
                    >
                      All Departments
                    </li>
                    {departments.map((item) => (
                      <li
                        key={item}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                        onClick={() => { setDepartmentFilter(item); setShowDepartment(false); }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Excel</button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200 font-semibold">
          <tr>
            <th className="border border-gray-300 px-2 py-2 w-12">No</th>
            <th className="border border-gray-300 px-4 py-2">NIK</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Division</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Position</th>
            <th className="border border-gray-300 px-4 py-2 text-center w-28">Action</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Detail</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                No data available
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.NIK ?? index} className="hover:bg-gray-50 transition">
                <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.NIK}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.division_name || "-"}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.department_name || "-"}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.position || "-"}</td>

                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="flex justify-center gap-2">

                    {/* Tombol Edit */}
                    <Link href={`/fulltime-employee/edit/${emp.NIK}`}>
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
                        <FiEdit size={16} /> Edit
                      </button>
                    </Link>

                    {/* Tombol Delete */}
                    <button
                      onClick={() => handleDelete(emp.NIK)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>

                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link href={`/fulltime-employee/detail/${emp.NIK}`}>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}
