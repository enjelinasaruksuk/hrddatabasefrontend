"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import Layout from "../components/Layout";

interface Employee {
  NIK: number;
  name: string;
  division_name: string;
  department_name: string;
  position: string;
}

export default function ManajemenITFulltimeEmployeePage() {
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/employees/type/fulltime");
      
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      
      const data = await response.json();
      console.log("Fulltime employees (Manajemen IT):", data);
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = employees;

    if (searchKeyword) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          emp.NIK.toString().includes(searchKeyword)
      );
    }

    if (selectedDivision) {
      filtered = filtered.filter((emp) => emp.division_name === selectedDivision);
    }

    if (selectedDepartment) {
      filtered = filtered.filter((emp) => emp.department_name === selectedDepartment);
    }

    setFilteredEmployees(filtered);
  }, [searchKeyword, selectedDivision, selectedDepartment, employees]);

  const handleDivisionSelect = (division: string) => {
    setSelectedDivision(division);
    setShowDivision(false);
  };

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    setShowDepartment(false);
  };

  const clearFilters = () => {
    setSelectedDivision("");
    setSelectedDepartment("");
    setSearchKeyword("");
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            👤
          </div>
          <h2 className="text-xl font-semibold">Fulltime Employee</h2>
        </div>

        <input
          placeholder="Search with name or NIK..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border rounded-full px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-3 relative">
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                onClick={() => {
                  setShowDivision(!showDivision);
                  setShowDepartment(false);
                }}
              >
                {selectedDivision || "Division"}
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    showDivision ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDivision && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                  <ul className="text-sm text-gray-700">
                    {["Overhead", "Manufacturing", "EPC 1", "EPC 2"].map((item) => (
                      <li
                        key={item}
                        onClick={() => handleDivisionSelect(item)}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
                onClick={() => {
                  setShowDepartment(!showDepartment);
                  setShowDivision(false);
                }}
              >
                {selectedDepartment || "Department"}
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    showDepartment ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDepartment && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                  <ul className="text-sm text-gray-700">
                    {["HRD", "Finance", "Business Development"].map((item) => (
                      <li
                        key={item}
                        onClick={() => handleDepartmentSelect(item)}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {(selectedDivision || selectedDepartment || searchKeyword) && (
              <button
                onClick={clearFilters}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          Excel
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading employees...</p>
        </div>
      ) : (
        <>
          <div className="mb-2 text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>

          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 w-12">No</th>
                  <th className="border border-gray-300 px-4 py-2">NIK</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Division</th>
                  <th className="border border-gray-300 px-4 py-2">Department</th>
                  <th className="border border-gray-300 px-4 py-2">Position</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Detail</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee, index) => (
                    <tr key={employee.NIK} className="hover:bg-gray-50 transition">
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{employee.NIK}</td>
                      <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {employee.division_name || "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {employee.department_name || "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {employee.position || "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Link href={`/manajemen-it/fulltime-employee/detail/${employee.NIK}`}>
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
          </div>
        </>
      )}
    </Layout>
  );
}