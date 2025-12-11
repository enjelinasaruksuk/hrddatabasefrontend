"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Layout from "../components/Layout";

interface Employee {
  nik: string;
  name: string;
  position: string;
  department_name: string;
  division_name: string;
  date_join: string;
  date_end: string | null;
}

// Daftar division & department (bisa fetch dari backend juga)
const divisions = ["Overhead", "Manufacturing", "EPC 1", "EPC 2"];
const departments = ["HRD", "Finance", "Business Development"];

export default function ContractEmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDivision, setShowDivision] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [divisionFilter, setDivisionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Fungsi untuk hitung sisa hari
  const calculateDaysLeft = (endDate: string | null) => {
    if (!endDate) return "-";
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/contracts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from backend:", data);
        
        if (!Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setEmployees([]);
          return;
        }

        const mapped = data.map((item: any) => ({
          nik: item.nik,
          name: item.name || "-", 
          position: item.position || "-",
          department_name: item.department_name || "-",
          division_name: item.division_name || "-",
          date_join: item.date_join,
          date_end: item.date_end,
        }));
        setEmployees(mapped);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setEmployees([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShowDetail = (item: Employee) => {
    localStorage.setItem("contractDetail", JSON.stringify(item));
    window.dispatchEvent(new Event("contract-detail-update"));
  };

  // Filter berdasarkan search, division, dan department
  const filteredEmployees = employees.filter((emp) => {
    const searchLower = search.toLowerCase();
    const matchSearch = 
      emp.nik.toString().toLowerCase().includes(searchLower) ||
      emp.name.toLowerCase().includes(searchLower) ||
      emp.position.toLowerCase().includes(searchLower) ||
      emp.department_name.toLowerCase().includes(searchLower) ||
      emp.division_name.toLowerCase().includes(searchLower);

    const matchDivision = divisionFilter === "" || emp.division_name === divisionFilter;
    const matchDepartment = departmentFilter === "" || emp.department_name === departmentFilter;

    return matchSearch && matchDivision && matchDepartment;
  });

  return (
    <Layout>
      <div className="p-6 font-['Cambria'] text-gray-800">
        {/* Header dengan Search */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Expiring Contracts</h1>
          <input
            placeholder="Search with name, NIK, position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-4">
          {/* Division Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
              onClick={() => { 
                setShowDivision(!showDivision); 
                setShowDepartment(false); 
              }}
            >
              {divisionFilter || "Division"}
              <FiChevronDown className={`transition-transform duration-200 ${showDivision ? "rotate-180" : ""}`} />
            </button>
            {showDivision && (
              <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer font-semibold"
                    onClick={() => { 
                      setDivisionFilter(""); 
                      setShowDivision(false); 
                    }}
                  >
                    All Divisions
                  </li>
                  {divisions.map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                      onClick={() => { 
                        setDivisionFilter(item); 
                        setShowDivision(false); 
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Department Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-300 transition"
              onClick={() => { 
                setShowDepartment(!showDepartment); 
                setShowDivision(false); 
              }}
            >
              {departmentFilter || "Department"}
              <FiChevronDown className={`transition-transform duration-200 ${showDepartment ? "rotate-180" : ""}`} />
            </button>
            {showDepartment && (
              <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer font-semibold"
                    onClick={() => { 
                      setDepartmentFilter(""); 
                      setShowDepartment(false); 
                    }}
                  >
                    All Departments
                  </li>
                  {departments.map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                      onClick={() => { 
                        setDepartmentFilter(item); 
                        setShowDepartment(false); 
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Loading State & Counter */}
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading employees...</div>
        ) : (
          <div className="mb-2 text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-yellow-300">
              <tr>
                <th className="border border-gray-400 px-3 py-2">No</th>
                <th className="border border-gray-400 px-3 py-2">NIK</th>
                <th className="border border-gray-400 px-3 py-2">Name</th>
                <th className="border border-gray-400 px-3 py-2">Position</th>
                <th className="border border-gray-400 px-3 py-2">Department</th>
                <th className="border border-gray-400 px-3 py-2">Division</th>
                <th className="border border-gray-400 px-3 py-2">Join Date</th>
                <th className="border border-gray-400 px-3 py-2">End Date</th>
                <th className="border border-gray-400 px-3 py-2">Days Left</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((item, index) => {
                  const daysLeft = calculateDaysLeft(item.date_end);

                  return (
                    <tr key={index} className="bg-yellow-100 hover:bg-yellow-50 transition">
                      <td className="border border-gray-400 px-3 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-400 px-3 py-2">{item.nik}</td>
                      <td className="border border-gray-400 px-3 py-2">{item.name}</td>
                      <td className="border border-gray-400 px-3 py-2">{item.position}</td>
                      <td className="border border-gray-400 px-3 py-2">{item.department_name}</td>
                      <td className="border border-gray-400 px-3 py-2">{item.division_name}</td>
                      <td className="border border-gray-400 px-3 py-2">
                        {new Date(item.date_join).toLocaleDateString('id-ID')}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {item.date_end ? new Date(item.date_end).toLocaleDateString('id-ID') : "-"}
                      </td>
                      <td
                        className={`border border-gray-400 px-3 py-2 font-bold text-center ${
                          typeof daysLeft === "number"
                            ? daysLeft <= 7
                              ? "text-red-600 bg-red-50"      // ≤ 7 hari: MERAH + background
                              : daysLeft <= 30
                              ? "text-orange-600 bg-orange-50" // 8-30 hari: OREN + background
                              : "text-green-600 bg-green-50"   // > 30 hari: HIJAU + background
                            : "text-gray-500"
                        }`}
                      >
                        {typeof daysLeft === "number" ? `${daysLeft} days` : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="border border-gray-400 px-3 py-4 text-center italic text-gray-500">
                    {search || divisionFilter || departmentFilter 
                      ? "No matching employees found" 
                      : "No employees found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}