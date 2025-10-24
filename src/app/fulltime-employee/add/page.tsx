"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();

  const [employee, setEmployee] = useState({
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
    nik: "",
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
    files: {} as Record<string, File | null>,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setEmployee((prev) => ({
        ...prev,
        files: { ...prev.files, [name]: files[0] },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage (files stored temporarily as filenames)
    const dataToSave = {
      ...employee,
      files: Object.fromEntries(
        Object.entries(employee.files).map(([key, file]) => [
          key,
          file ? file.name : null,
        ])
      ),
    };
    localStorage.setItem("employeeData", JSON.stringify(dataToSave));
    alert("Employee data has been successfully saved!");
    router.push("/fulltime-employee/detail/1");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-5xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Employee</h1>

        {/* === Biodata === */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-4">Biodata</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="motherName"
              placeholder="Biological Mother's Name"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="religion"
              placeholder="Religion"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="placeOfBirth"
              placeholder="Place of Birth"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="maritalStatus"
              placeholder="Marital Status"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="identityNumber"
              placeholder="Identity Number"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="lastEducation"
              placeholder="Last Education"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* === Employment Information === */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-4">
            Employment Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="nik"
              placeholder="NIK"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="npwp"
              placeholder="NPWP"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="accountNumber"
              placeholder="Account Number"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="division"
              placeholder="Division"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="dateJoin"
              type="date"
              placeholder="Date Joined"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="department"
              placeholder="Department"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="dateEnd"
              type="date"
              placeholder="Date of End"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="position"
              placeholder="Position"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="mcuHistory"
              placeholder="MCU History"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="trainingList"
              placeholder="Training List"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* === Payroll Information === */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-4">
            Payroll Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="allInSalary"
              placeholder="All-In Salary"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="fixedAllowance"
              placeholder="Fixed Allowance"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="basicSalary"
              placeholder="Basic Salary"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="irregularAllowance"
              placeholder="Irregular Allowance"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* === Employee Benefit === */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-4">
            Employee Benefit
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="bpjsEmployment"
              placeholder="BPJS Employment"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="bpjsHealth"
              placeholder="BPJS Health"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* === Upload Documents === */}
        <section>
          <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1 text-black">
            Upload Documents
          </h2>
          <div className="grid grid-cols-2 gap-4 text-black">
            {[
              ["photo", "Photo (Formal)"],
              ["ktp", "Identity Card (KTP)"],
              ["npwp", "Tax Number (NPWP)"],
              ["bpjsKesehatan", "BPJS Health Insurance"],
              ["bpjsKetenagakerjaan", "BPJS Employment Insurance"],
              ["kartukeluarga", "Family Card (KK)"],
              ["sertifikattraining", "Training Certificate"],
              ["hasilmcu", "Medical Check Up Result"],
              ["cv", "Curriculum Vitae (CV)"],
              ["ijazah", "Diploma / Certificate"],
            ].map(([name, label]) => (
              <label key={name} className="flex flex-col">
                <span className="mb-1 font-semibold">{label}</span>
                <input
                  type="file"
                  name={name}
                  onChange={handleFileChange}
                  className="border p-2 rounded"
                />
              </label>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
