"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEmployee() {
  const router = useRouter();
  const { id } = useParams(); // ID = NIK employee

  const [employee, setEmployee] = useState({
    nik: "",
    name: "",
    motherName: "",
    address: "",
    religion: "",
    dob: "",
    age: "",
    placeOfBirth: "",
    maritalStatus: "",
    phone: "",
    identityNumber: "",
    lastEducation: "",
    npwp: "",
    accountNumber: "",
    division: "",
    dateJoin: "",
    department: "",
    dateEnd: "",
    position: "",
    mcuHistory: "",
    trainingList: "",
    allInSalary: "",
    fixedAllowance: "",
    basicSalary: "",
    irregularAllowance: "",
    bpjsEmployment: "",
    bpjsHealth: "",
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // Fetch data existing
const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/employees/${id}`);
    const raw = await res.json();

    console.log("RAW BACKEND:", raw);

    const data = Array.isArray(raw) ? raw[0] : raw;

    setEmployee({
      nik: data.nik || "",
      name: data.name || "",
      motherName: data.mother_name || "",
      address: data.address || "",
      religion: data.religion || "",
      dob: formatDate(data.birth_date),
      age: data.age?.toString() || "",
      placeOfBirth: data.birth_place || "",
      maritalStatus: data.marital_status || "",
      phone: data.phone_number || "",
      identityNumber: data.identity_number || "",
      lastEducation: data.last_education || "",
      npwp: data.tax_number || "",
      accountNumber: data.bank_account || "",
      division: data.division_name || "",
      dateJoin: formatDate(data.date_join),
      department: data.department_id?.toString() || "",
      dateEnd: formatDate(data.date_end),
      position: data.position || "",
      mcuHistory: data.mcu_history || "",
      trainingList: data.training_list || "",
      allInSalary: data.all_in_salary || "",
      fixedAllowance: data.fixed_allowance || "",
      basicSalary: data.basic_salary || "",
      irregularAllowance: data.irregular_allowance || "",
      bpjsEmployment: data.bpjs_employment || "",
      bpjsHealth: data.bpjs_health || "",
    });

  } catch (err) {
    console.error(err);
    alert("Gagal mengambil data!");
  }
};

useEffect(() => {
  if (id) fetchData();
}, [id]);

  const handleChange = (e: any) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      nik: employee.nik,
      name: employee.name,
      birth_place: employee.placeOfBirth,
      birth_date: employee.dob,
      age: employee.age ? Number(employee.age) : null,
      mother_name: employee.motherName,
      religion: employee.religion,
      address: employee.address,
      phone_number: employee.phone,
      marital_status: employee.maritalStatus,
      last_education: employee.lastEducation,
      bank_account: employee.accountNumber,
      identity_number: employee.identityNumber,
      tax_number: employee.npwp,
      department_id: employee.department
        ? Number(employee.department)
        : null,
      position: employee.position,
      employment_type: "Fulltime",
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/employees/${employee.nik}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        alert("Gagal update!");
        return;
      }

      alert("Update berhasil!");
      router.push("/fulltime-employee");
    } catch (err) {
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Employee
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">

          {/* === BIODATA === */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Biodata</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Looping biodata */}
              {[
                ["name", "Full Name"],
                ["motherName", "Mother's Name"],
                ["address", "Address"],
                ["religion", "Religion"],
                ["dob", "Date of Birth", "date"],
                ["age", "Age"],
                ["placeOfBirth", "Place of Birth"],
                ["maritalStatus", "Marital Status"],
                ["phone", "Phone Number"],
                ["identityNumber", "Identity Number"],
                ["lastEducation", "Last Education"],
              ].map(([field, label, type = "text"]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* === Employment */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Employment Info</h2>

            <div className="grid grid-cols-2 gap-4">

              {[
                ["nik", "NIK"],
                ["npwp", "NPWP"],
                ["accountNumber", "Account Number"],
                ["position", "Position"],
                ["mcuHistory", "MCU History"],
                ["trainingList", "Training List"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}

              {/* Division */}
              <div>
                <label>Division</label>
                <select
                  name="division"
                  value={employee.division}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Division</option>
                  <option value="Overhead">Overhead</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="EPC 1">EPC 1</option>
                  <option value="EPC 2">EPC 2</option>
                </select>
              </div>

              {/* Date Join */}
              <div>
                <label>Date Join</label>
                <input
                  type="date"
                  name="dateJoin"
                  value={employee.dateJoin}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Department */}
              <div>
                <label>Department</label>
                <select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Department</option>
                  <option value="1">HRD</option>
                  <option value="2">Finance</option>
                  <option value="3">Business Development</option>
                </select>
              </div>

              {/* Date End */}
              <div>
                <label>Date End</label>
                <input
                  type="date"
                  name="dateEnd"
                  value={employee.dateEnd}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          </section>

          {/* Payroll */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Payroll</h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["allInSalary", "All In Salary"],
                ["fixedAllowance", "Fixed Allowance"],
                ["basicSalary", "Basic Salary"],
                ["irregularAllowance", "Irregular Allowance"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Benefit */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Benefit</h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["bpjsEmployment", "BPJS Employment"],
                ["bpjsHealth", "BPJS Health"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-6 py-2 rounded">
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
