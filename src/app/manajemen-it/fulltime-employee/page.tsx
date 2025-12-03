"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import Layout from "../components/Layout";

// Interface disesuaikan dengan output backend
interface Employee {
  NIK: number;
  name: string;
  birth_place: string | null;
  birth_date?: string | null;
  age: number | null;
  mother_name?: string | null;
  religion?: string | null;
  address?: string | null;
  phone_number?: string | null;
  marital_status?: string | null;
  last_education?: string | null;
  bank_account?: string | null;
  identity_number?: string | null;
  tax_number?: string | null;
  department_id?: number | null;
  position?: string | null;
  employment_type?: string | null;
  division_name?: string | null;
  department_name?: string | null;
  salary_all_in?: number | null;
  salary_basic?: number | null;
  fixed_allowance?: number | null;
  allowance_irregular?: number | null;
  bpjs_employment?: string | null;
  bpjs_health?: string | null;
  date_join?: string | null;
  date_end?: string | null;
  contract_status?: string | null;
  last_mcu_date?: string | null;
  training_list?: string | null;
  photo?: string | null;
  file_ktp?: string | null;
  file_npwp?: string | null;
  file_bpjs_kesehatan?: string | null;
  file_bpjs_ketenagakerjaan?: string | null;
  file_kk?: string | null;
  file_training?: string | null;
  file_mcu?: string | null;
  file_cv?: string | null;
  file_ijazah?: string | null;
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

  const downloadAllEmployeesExcel = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/type/fulltime`);
      const data: Employee[] = await res.json();

      if (!data || data.length === 0) {
        alert("No employee data available");
        return;
      }
      console.log(data);

      const excelData = data.map(emp => ({
        NIK: emp.NIK,
        Name: emp.name || "-",
        BirthPlace: emp.birth_place || "-",
        BirthDate: emp.birth_date ? new Date(emp.birth_date).toISOString().split('T')[0] : "-",
        Age: emp.age ?? "-",
        MotherName: emp.mother_name || "-",
        Religion: emp.religion || "-",
        Address: emp.address || "-",
        Phone: emp.phone_number || "-",
        MaritalStatus: emp.marital_status || "-",
        LastEducation: emp.last_education || "-",
        BankAccount: emp.bank_account || "-",
        IdentityNumber: emp.identity_number || "-",
        TaxNumber: emp.tax_number || "-",
        Division: emp.division_name || "-",
        Department: emp.department_name || "-",
        Position: emp.position || "-",
        EmploymentType: emp.employment_type || "-",
        SalaryAllIn: emp.salary_all_in ?? 0,
        SalaryBasic: emp.salary_basic ?? 0,
        FixedAllowance: emp.fixed_allowance ?? 0,
        NonFixedAllowance: emp.allowance_irregular ?? 0,
        BPJSEmployment: emp.bpjs_employment || "-",
        BPJSHealth: emp.bpjs_health || "-",
        ContractStart: emp.date_join ? new Date(emp.date_join).toISOString().split('T')[0] : "-",
        ContractEnd: emp.date_end ? new Date(emp.date_end).toISOString().split('T')[0] : "-",
        ContractStatus: emp.contract_status || "-",
        MCUHistory: emp.last_mcu_date
          ? new Date(emp.last_mcu_date).toISOString().split("T")[0]
          : "-",
        TrainingList: emp.training_list || "-",
        PhotoFile: emp.photo || "-",
        KTPFile: emp.file_ktp || "-",
        NPWPFile: emp.file_npwp || "-",
        BPJSHealthFile: emp.file_bpjs_kesehatan || "-",
        BPJSEmploymentFile: emp.file_bpjs_ketenagakerjaan || "-",
        KKFile: emp.file_kk || "-",
        TrainingFile: emp.file_training || "-",
        MCUFile: emp.file_mcu || "-",
        CVFile: emp.file_cv || "-",
        DegreeFile: emp.file_ijazah || "-"
      }));

      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Fulltime Employees");

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "Fulltime Employees.xlsx");
    } catch (error) {
      console.error(error);
      alert("Failed to download Excel");
    }
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
            {/* DIVISION DROPDOWN */}
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
                  className={`transition-transform duration-200 ${showDivision ? "rotate-180" : ""}`}
                />
              </button>

              {showDivision && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                  <ul className="text-sm text-gray-700">
                    {["All Division", "Overhead", "Manufacturing", "EPC 1", "EPC 2"].map((item) => (
                      <li
                        key={item}
                        onClick={() => handleDivisionSelect(item === "All Division" ? "" : item)}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* DEPARTMENT DROPDOWN */}
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
                  className={`transition-transform duration-200 ${showDepartment ? "rotate-180" : ""}`}
                />
              </button>

              {showDepartment && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn">
                  <ul className="text-sm text-gray-700">
                    {["All Department", "HRD", "Finance", "Business Development"].map((item) => (
                      <li
                        key={item}
                        onClick={() => handleDepartmentSelect(item === "All Department" ? "" : item)}
                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
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
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={downloadAllEmployeesExcel} // <- sambungkan fungsi di sini
        >
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
                    <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                      No data available
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
