"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddParttimeEmployee() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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
    hourlyRate: "",
    totalHours: "",
    allowance: "",
    bpjsEmployment: "",
    bpjsHealth: "",
    files: {} as Record<string, File | null>,
  });

  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...employee,
      files: Object.fromEntries(
        Object.entries(employee.files).map(([key, file]) => [
          key,
          file ? file.name : null,
        ])
      ),
    };
    localStorage.setItem("parttimeEmployeeData", JSON.stringify(dataToSave));
    alert("Part-time employee data has been successfully saved!");
    router.push("/parttime-employee");
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/parttime-employee");
    }, 300);
  };

  // Pilihan dropdown
  const divisions = ["Overhead", "Manufacturing", "EPC 1", "EPC 2"];
  const departments = ["HR", "Finance", "Business Development"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {showModal && (
        <div
          className={`bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-8 relative transform transition-all duration-300 ${
            fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-6 text-gray-600 hover:text-black text-2xl"
          >
            ✕
          </button>

          <h1 className="text-2xl font-bold text-center mb-6">
            Add Employee
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {/* === Biodata === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Biodata
              </h2>
              <div className="grid grid-cols-2 gap-4">
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
                ].map(([name, label, type = "text"]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={label}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* === Employment Information === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Employment Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* NIK, NPWP, Account Number */}
                {[
                  ["nik", "NIK"],
                  ["npwp", "NPWP"],
                  ["accountNumber", "Account Number"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type="text"
                      placeholder={label}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}

                {/* === Division dropdown === */}
                <div className="flex flex-col">
                  <label
                    htmlFor="division"
                    className="font-semibold text-gray-700 mb-1"
                  >
                    Division
                  </label>
                  <select
                    id="division"
                    name="division"
                    value={employee.division}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    <option value="">Select Division</option>
                    {divisions.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="dateJoin"
                    className="font-semibold text-gray-700 mb-1"
                  >
                    Date Joined
                  </label>
                  <input
                    id="dateJoin"
                    name="dateJoin"
                    type="date"
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </div>

                {/* === Department dropdown === */}
                <div className="flex flex-col">
                  <label
                    htmlFor="department"
                    className="font-semibold text-gray-700 mb-1"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {[
                  ["dateEnd", "Date of End", "date"],
                  ["position", "Position"],
                  ["mcuHistory", "MCU History"],
                  ["trainingList", "Training List"],
                ].map(([name, label, type = "text"]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={label}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* === Payroll Information === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Payroll Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["hourlyRate", "Hourly Rate"],
                  ["totalHours", "Total Hours Worked"],
                  ["allowance", "Allowance"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      placeholder={label}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* === Employee Benefit === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Employee Benefit
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["bpjsEmployment", "BPJS Employment"],
                  ["bpjsHealth", "BPJS Health"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      placeholder={label}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* === Upload Documents === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Upload Documents
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {[
                  ["photo", "Photo (Formal)"],
                  ["ktp", "Identity Card (KTP)"],
                  ["npwpFile", "Tax Number (NPWP)"],
                  ["bpjsKesehatan", "BPJS Health Insurance"],
                  ["bpjsKetenagakerjaan", "BPJS Employment Insurance"],
                  ["kartukeluarga", "Family Card (KK)"],
                  ["sertifikattraining", "Training Certificate"],
                  ["hasilmcu", "Medical Check Up Result"],
                  ["cv", "Curriculum Vitae (CV)"],
                  ["ijazah", "Diploma / Certificate"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label
                      htmlFor={name}
                      className="font-semibold mb-1 text-gray-800"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-700 border border-gray-400 rounded-md cursor-pointer bg-gray-100 
                        file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                        file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
