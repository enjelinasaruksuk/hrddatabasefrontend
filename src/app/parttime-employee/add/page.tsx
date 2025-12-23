"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddParttimeEmployee() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    email: "",
    identityNumber: "",
    lastEducation: "",
    nik: "",
    npwp: "",
    bankType: "",
    accountNumber: "",
    division: "",
    dateJoin: "",
    department: "",
    dateEnd: "",
    position: "",
    mcuHistory: "",
    trainingList: "",
    salaryAllIn: "",
    fixedAllowance: "",
    salaryBasic: "",
    nonFixedAllowance: "",
    bpjsEmployment: "",
    bpjsHealth: "",
    files: {} as Record<string, File | null>,
  });

  type Training = {
    detail: string;
    trainingDate: string;
    expiryDate: string;
  };

  const numericRules: Record<string, number> = {
    npwp: 15,
    bpjsHealth: 13,
    bpjsEmployment: 11,
    identityNumber: 16,
  };

  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [training, setTraining] = useState<Training>({
    detail: "",
    trainingDate: "",
    expiryDate: "",
  });

  // ADD: Format Rupiah Function
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^0-9]/g, "");
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // EDIT: handleChange
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // --- Logic umur otomatis ---
    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setEmployee({
        ...employee,
        dob: value,
        age: age.toString(),
      });

      return;
    }

    // === Handle change (NPWP, BPJS dan NIK KTP) ===
    if (numericRules[name]) {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setEmployee({ ...employee, [name]: onlyNumbers });
      return;
    }

    // Field payroll yang harus format rupiah
    const salaryFields = [
      "salaryAllIn",
      "fixedAllowance",
      "salaryBasic",
      "nonFixedAllowance",
    ];

    if (salaryFields.includes(name)) {
      return setEmployee({
        ...employee,
        [name]: formatRupiah(value),
      });
    }

    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const maxSize = 5 * 1024 * 1024; // 5MB dalam bytes
      
      if (files[0].size > maxSize) {
        alert(`File ${files[0].name} terlalu besar! Maksimal ukuran file adalah 5MB`);
        e.target.value = ""; // Reset input
        return;
      }
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors: Record<string, string> = {};

    // List field yang wajib diisi
    const requiredFields = [
      "name",
      "motherName",
      "address",
      "religion",
      "dob",
      "placeOfBirth",
      "maritalStatus",
      "phone",
      "email",
      "identityNumber",
      "lastEducation",
      "nik",
      "npwp",
      "bankType",
      "accountNumber",
      "division",
      "dateJoin",
      "dateEnd",
      "department",
      "position",
      "salaryAllIn",
      "fixedAllowance",
      "salaryBasic",
      "nonFixedAllowance",
      "bpjsEmployment",
      "bpjsHealth"
    ];

    // Cek setiap field wajib
    requiredFields.forEach((field) => {
      if (!(employee as any)[field]) {
        newErrors[field] = "*This field is required";
        hasError = true;
      }
    });

    if (employee.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employee.email)) {
        newErrors["email"] = "*Invalid email format";
        hasError = true;
      }
    }

    // Validasi training juga
    if (!training.detail) {
      newErrors["trainingDetail"] = "*This field is required";
      hasError = true;
    }
    if (!training.trainingDate) {
      newErrors["trainingDate"] = "*This field is required";
      hasError = true;
    }
    if (!training.expiryDate) {
      newErrors["expiryDate"] = "*This field is required";
      hasError = true;
    }

    // === File wajib (hanya photo dan ktp) ===
    const allFiles = [
      "photo",
      "ktp",
      "npwpFile",
      "bpjsKesehatan",
      "bpjsKetenagakerjaan",
      "kartukeluarga",
      "sertifikattraining",
      "hasilmcu",
      "cvkaryawan",
      "degreeCertificate"
    ];

    ["photo", "ktp"].forEach((fileField) => {
      if (!employee.files[fileField]) {
        newErrors[fileField] = "*This file is required";
        hasError = true;
      }
    });

    // Validasi numeric fields
    for (const field in numericRules) {
      const requiredLength = numericRules[field];
      const currentValue = (employee as any)[field];
      if (!currentValue || currentValue.length < requiredLength) {
        newErrors[field] = `*Minimum ${requiredLength} digits`;
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      alert("Please fill all required fields correctly.");
      return; // stop submit
    }

    const formData = new FormData();

    formData.append("nik", employee.nik);
    formData.append("name", employee.name);
    formData.append("birth_place", employee.placeOfBirth);
    formData.append("birth_date", employee.dob || "");
    formData.append("age", employee.age || "");
    formData.append("mother_name", employee.motherName);
    formData.append("religion", employee.religion);
    formData.append("address", employee.address);
    formData.append("phone_number", employee.phone);
    formData.append("email", employee.email);
    formData.append("marital_status", employee.maritalStatus);
    formData.append("last_education", employee.lastEducation);
    formData.append("bank_type", employee.bankType);
    formData.append("bank_account", employee.accountNumber);
    formData.append("identity_number", employee.identityNumber);
    formData.append("tax_number", employee.npwp);
    formData.append("department_id", employee.department || "");
    formData.append("position", employee.position);
    formData.append("employment_type", "parttime");

    // === TAMBAHAN: KIRIM DATA PAYROLL ===
    formData.append("salary_all_in", employee.salaryAllIn);
    formData.append("salary_basic", employee.salaryBasic);
    formData.append("fixed_allowance", employee.fixedAllowance);
    formData.append("non_fixed_allowance", employee.nonFixedAllowance);
    formData.append("bpjs_employment", employee.bpjsEmployment);
    formData.append("bpjs_health", employee.bpjsHealth);

    // === TAMBAHAN: KIRIM DATA CONTRACT ===
    formData.append("date_join", employee.dateJoin);
    formData.append("date_end", employee.dateEnd);

    // === TAMBAHAN: KIRIM DATA MCU ===
    formData.append("mcu_date", employee.mcuHistory);

    // === KIRIM DATA TRAINING ===
    formData.append("training_detail", training.detail);
    formData.append("training_date", training.trainingDate || "");
    formData.append("expiry_date", training.expiryDate || "");

    // Append files (semua yang ada, baik wajib maupun opsional)
    allFiles.forEach((fileField) => {
      const file = employee.files[fileField];
      if (file) formData.append(fileField, file);
    });

    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("failed to save data to server:", data);
        alert("Failed to save data to the server. See the console for error details.");
        return;
      }

      alert("successfully added to the database!");
      router.push("/parttime-employee");

    } catch (error) {
      alert("unable to connect to backend server!");
    }
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/parttime-employee");
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {showModal && (
        <div
          className={`bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-8 relative transform transition-all duration-300 ${fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-6 text-gray-600 hover:text-black text-2xl"
          >
            ✕
          </button>

          <h1 className="text-2xl font-bold text-center mb-6">Add Employee</h1>

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
                  ["email", "Email", "email"],
                  ["religion", "Religion"],
                  ["address", "Address (RT/RW, Sub-districts and Villages)"],
                  ["dob", "Date of Birth", "date"],
                  ["placeOfBirth", "Place of Birth"],
                  ["age", "Age"],
                  ["maritalStatus", "Marital Status", "select"],
                  ["phone", "Phone Number"],
                  ["identityNumber", "Identity Number (NIK KTP)"],
                  ["lastEducation", "Last Education (Major/Jurusan)"]
                ].map(([name, label, type = "text"]) => (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">{label}</label>

                    {type === "select" ? (
                      <select
                        name={name}
                        value={employee.maritalStatus}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                      >
                        <option value="" disabled>Select Status</option>
                        <option value="TK">TK</option>
                        <option value="K/01">K/01</option>
                        <option value="K/02">K/02</option>
                      </select>
                    ) : (
                      <input
                        name={name}
                        type={name === "age" ? "text" : type}
                        placeholder={label}
                        value={(employee as any)[name]}
                        onChange={handleChange}
                        className={`border p-2 rounded ${name === "age" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        readOnly={name === "age"}
                      />
                    )}

                    {errors[name] && (
                      <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
                    )}
                  </div>
                ))}

                <div className="col-span-2">
                  <div className="flex gap-2 mb-2 items-end">
                    <div className="flex flex-col w-1/3">
                      <label className="font-semibold text-gray-700 mb-1">Training List</label>
                      <input
                        type="text"
                        placeholder="Training Detail"
                        value={training.detail}
                        onChange={(e) => setTraining({ ...training, detail: e.target.value })}
                        className="border p-2 rounded"
                      />
                      {errors["trainingDetail"] && (
                        <span className="text-red-600 text-sm mt-1">{errors["trainingDetail"]}</span>
                      )}
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label className="font-semibold text-gray-700 mb-1">Training Date</label>
                      <input
                        type="date"
                        value={training.trainingDate}
                        onChange={(e) => setTraining({ ...training, trainingDate: e.target.value })}
                        className="border p-2 rounded"
                      />
                      {errors["trainingDate"] && (
                        <span className="text-red-600 text-sm mt-1">{errors["trainingDate"]}</span>
                      )}
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label className="font-semibold text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="date"
                        value={training.expiryDate}
                        onChange={(e) => setTraining({ ...training, expiryDate: e.target.value })}
                        className="border p-2 rounded"
                      />
                      {errors["expiryDate"] && (
                        <span className="text-red-600 text-sm mt-1">{errors["expiryDate"]}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* === Employment Information === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Employment Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["nik", "NIK (Employee Identification Number)"],
                  ["bankType", "Bank Type"],
                  ["npwp", "NPWP"],
                  ["accountNumber", "Account Number"],
                  ["position", "Position"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      name={name}
                      placeholder={label}
                      value={(employee as any)[name]}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                    {errors[name] && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors[name]}
                      </span>
                    )}

                  </div>
                ))}

                {/* MCU History sebagai tanggal */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    MCU History
                  </label>
                  <input
                    name="mcuHistory"
                    type="date"
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  {errors["mcuHistory"] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors["mcuHistory"]}
                    </span>
                  )}
                </div>

                {/* Dropdown Division */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    Division
                  </label>
                  <select
                    name="division"
                    value={employee.division}
                    onChange={handleChange}
                    className="border p-2 rounded bg-white"
                  >
                    <option value="" disabled>Select Division</option>
                    <option value="Overhead">Overhead</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="EPC 1">EPC 1</option>
                    <option value="EPC 2">EPC 2</option>
                  </select>
                  {errors["division"] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors["division"]}
                    </span>
                  )}
                </div>

                {/* Date Joined */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    Date of Joined
                  </label>
                  <input
                    name="dateJoin"
                    type="date"
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  {errors["dateJoin"] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors["dateJoin"]}
                    </span>
                  )}

                </div>

                {/* Dropdown Department */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="border p-2 rounded bg-white"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="1">HRD</option>
                    <option value="2">Finance</option>
                    <option value="3">Business Development</option>
                  </select>
                  {errors["department"] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors["department"]}
                    </span>
                  )}
                </div>

                {/* Date End */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">
                    Date of End
                  </label>
                  <input
                    name="dateEnd"
                    type="date"
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  {errors["dateEnd"] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors["dateEnd"]}
                    </span>
                  )}

                </div>
              </div>
            </section>

            {/* === Payroll === */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-1 mb-4">
                Payroll Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["salaryAllIn", "Salary All In"],
                  ["fixedAllowance", "Fixed Allowance"],
                  ["salaryBasic", "Salary Basic"],
                  ["nonFixedAllowance", "Non Fixed Allowance"],
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      {label}
                    </label>

                    <input
                      name={name}
                      placeholder={label}
                      value={(employee as any)[name]}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />

                    {errors[name] && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors[name]}
                      </span>
                    )}
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
                    <label className="font-semibold text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      name={name}
                      placeholder={label}
                      value={(employee as any)[name]}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                    {errors[name] && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors[name]}
                      </span>
                    )}

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
                  ["ktp", "Identity Card/KTP"],
                  ["npwpFile", "Tax Number/NPWP (Optional)"],
                  ["bpjsKesehatan", "BPJS Health Insurance (Optional)"],
                  ["bpjsKetenagakerjaan", "BPJS Employment Insurance (Optional)"],
                  ["kartukeluarga", "Family Card/KK (Optional)"],
                  ["sertifikattraining", "Training Certificate (Optional)"],
                  ["hasilmcu", "Medical Check Up Result (Optional)"],
                  ["cvkaryawan", "CV/Resume (Optional)"],
                  ["degreeCertificate", "Degree Certificate/Ijazah (Optional)"]
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold mb-1 text-gray-800">
                      {label}
                    </label>
                    <input
                      type="file"
                      name={name}
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-700 border border-gray-400 rounded-md cursor-pointer bg-gray-100 
                      file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                      file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500"
                    />
                    {errors[name] && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors[name]}
                      </span>
                    )}
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