"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEmployee() {
  const router = useRouter();
  const { id } = useParams(); // NIK

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const numericRules: Record<string, number> = {
    npwp: 15,
    bpjsHealth: 13,
    bpjsEmployment: 11,
    identityNumber: 16,
  };

  const salaryFields = [
    "salaryAllIn",
    "fixedAllowance",
    "salaryBasic",
    "nonFixedAllowance",
  ];

  const [employee, setEmployee] = useState<any>({
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
    salaryAllIn: "",
    fixedAllowance: "",
    salaryBasic: "",
    nonFixedAllowance: "",
    bpjsEmployment: "",
    bpjsHealth: "",
    files: {},
  });

  type Training = {
    detail: string;
    trainingDate: string;
    expiryDate: string;
  };

  const [training, setTraining] = useState<Training>({
    detail: "",
    trainingDate: "",
    expiryDate: "",
  });

  // --------------------------
  // FORMAT RUPIAH
  // --------------------------
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^0-9]/g, "");
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // --------------------------
  // HANDLE CHANGE
  // --------------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // umur otomatis
    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

      setEmployee({ ...employee, dob: value, age: age.toString() });
      return;
    }

    // numeric rule
    if (numericRules[name]) {
      return setEmployee({
        ...employee,
        [name]: value.replace(/[^0-9]/g, ""),
      });
    }

    // salary
    if (salaryFields.includes(name)) {
      return setEmployee({
        ...employee,
        [name]: formatRupiah(value),
      });
    }

    setEmployee({ ...employee, [name]: value });
  };

  // --------------------------
  // HANDLE UPLOAD FILE
  // --------------------------
  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setEmployee((prev: any) => ({
      ...prev,
      files: { ...prev.files, [name]: files[0] },
    }));

    setFileNames((prev) => ({
      ...prev,
      [name]: files[0].name,
    }));
  };

  // --------------------------
  // FETCH DATA EMPLOYEE
  // --------------------------
  const fetchData = async () => {
    try {
      // ❌ SALAH - GANTI INI
      // const res = await fetch(http://localhost:5000/api/employees/${id});
      // ✅ BENAR - PAKAI INI
      const res = await fetch(`http://localhost:5000/api/employees/${id}`);
      
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw[0] : raw;
      console.log("DATA DARI BACKEND:", data);

      // Parse MCU History (format: "05/10/2025" -> "2025-10-05")
      let mcuHistoryDate = "";
      if (data.mcu_history) {
        const mcuParts = data.mcu_history.split("/");
        if (mcuParts.length === 3) {
          // ❌ SALAH - GANTI INI
          // mcuHistoryDate = ${mcuParts[2]}-${mcuParts[1]}-${mcuParts[0]};
          // ✅ BENAR - PAKAI INI
          mcuHistoryDate = `${mcuParts[2]}-${mcuParts[1]}-${mcuParts[0]}`;
        }
      }

      // Parse Training List 
      let trainingDetail = "";
      let trainingDateParsed = "";
      if (data.training_list) {
        const match = data.training_list.match(/^(.+?)\s*\((\d{2}\/\d{2}\/\d{4})\)$/);
        if (match) {
          trainingDetail = match[1].trim();
          const dateParts = match[2].split("/");
          // ❌ SALAH - GANTI INI
          // trainingDateParsed = ${dateParts[2]}-${dateParts[1]}-${dateParts[0]};
          // ✅ BENAR - PAKAI INI
          trainingDateParsed = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        } else {
          trainingDetail = data.training_list;
        }
      }

      setEmployee((prev: any) => ({
        ...prev,
        nik: data.NIK || "",
        name: data.name || "",
        motherName: data.mother_name || "",
        address: data.address || "",
        religion: data.religion || "",
        dob: data.birth_date?.split("T")[0] || "",
        age: String(data.age || ""),
        placeOfBirth: data.birth_place || "",
        maritalStatus: data.marital_status || "",
        phone: data.phone_number || "",
        identityNumber: data.identity_number || "",
        lastEducation: data.last_education || "",
        npwp: data.tax_number || "",
        accountNumber: data.bank_account || "",

        // Division / Department
        division: data.division_name || "",
        department: data.department_id?.toString() || "",

        dateJoin: data.date_join?.split("T")[0] || "",
        dateEnd: data.date_end?.split("T")[0] || "",
        position: data.position || "",
        mcuHistory: mcuHistoryDate || "",

        // Payroll
        salaryAllIn: formatRupiah(String(data.salary_all_in || "")),
        fixedAllowance: formatRupiah(String(data.fixed_allowance || "")),
        salaryBasic: formatRupiah(String(data.salary_basic || "")),
        nonFixedAllowance: formatRupiah(String(data.allowance_irregular || "")),

        // BPJS
        bpjsEmployment: data.bpjs_employment || "",
        bpjsHealth: data.bpjs_health || "",

        // FILES
        files: {
          photo: data.photo,
          ktp: data.file_ktp,
          npwpFile: data.file_npwp,
          bpjsKesehatan: data.file_bpjs_kesehatan,
          bpjsKetenagakerjaan: data.file_bpjs_ketenagakerjaan,
          kartukeluarga: data.file_kk,
          sertifikattraining: data.file_training,
          hasilmcu: data.file_mcu,
          cvkaryawan: data.file_cv,
          degreeCertificate: data.file_ijazah,
        }
      }));

      // Set training data
      setTraining({
        detail: trainingDetail || data.training_detail || "",
        trainingDate: trainingDateParsed || data.training_date?.split("T")[0] || "",
        expiryDate: data.expiry_date?.split("T")[0] || "",
      });
      
      console.log("Parsed Training data:", {
        original: data.training_list,
        detail: trainingDetail,
        trainingDate: trainingDateParsed,
        expiryDate: data.expiry_date
      });

    } catch (err) {
      console.error(err);
      alert("failed to retrieve data!");
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // --------------------------
  // SUBMIT UPDATE
  // --------------------------
  const handleSubmit = async (e: any) => {
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
      "identityNumber",
      "lastEducation",
      "nik",
      "npwp",
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

    // Validasi training juga
    if (!training.detail) {
      newErrors["trainingDetail"] = "*Training detail is required";
      hasError = true;
    }
    if (!training.trainingDate) {
      newErrors["trainingDate"] = "*Training date is required";
      hasError = true;
    }
    if (!training.expiryDate) {
      newErrors["expiryDate"] = "*Expiry date is required";
      hasError = true;
    }

    // Validasi numeric fields
    for (const field in numericRules) {
      const requiredLength = numericRules[field];
      const currentValue = (employee as any)[field];
      if (!currentValue || currentValue.length < requiredLength) {
        // ❌ SALAH - GANTI INI
        // newErrors[field] = *Minimum ${requiredLength} digits;
        // ✅ BENAR - PAKAI INI
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

    // Append data biasa
    formData.append("nik", employee.nik);
    formData.append("name", employee.name);
    formData.append("birth_place", employee.placeOfBirth);
    formData.append("birth_date", employee.dob || "");
    formData.append("age", employee.age || "");
    formData.append("mother_name", employee.motherName);
    formData.append("religion", employee.religion);
    formData.append("address", employee.address);
    formData.append("phone_number", employee.phone);
    formData.append("marital_status", employee.maritalStatus);
    formData.append("last_education", employee.lastEducation);
    formData.append("bank_account", employee.accountNumber);
    formData.append("identity_number", employee.identityNumber);
    formData.append("tax_number", employee.npwp);
    formData.append("department_id", employee.department || "");
    formData.append("position", employee.position);
    formData.append("employment_type", "parttime");

    // Payroll (convert to number)
    formData.append("salary_all_in", employee.salaryAllIn.replace(/\./g, ""));
    formData.append("salary_basic", employee.salaryBasic.replace(/\./g, ""));
    formData.append("fixed_allowance", employee.fixedAllowance.replace(/\./g, ""));
    formData.append("non_fixed_allowance", employee.nonFixedAllowance.replace(/\./g, ""));
    formData.append("bpjs_employment", employee.bpjsEmployment);
    formData.append("bpjs_health", employee.bpjsHealth);

    // Contract
    formData.append("date_join", employee.dateJoin);
    formData.append("date_end", employee.dateEnd);

    // MCU
    formData.append("mcu_date", employee.mcuHistory);

    // Training
    formData.append("training_detail", training.detail);
    formData.append("training_date", training.trainingDate || "");
    formData.append("expiry_date", training.expiryDate || "");

    // append files (hanya jika user upload file baru)
    Object.entries(employee.files).forEach(([key, file]) => {
      if (file instanceof File) formData.append(key, file);
    });

    try {
      // ❌ SALAH - GANTI INI
      // const res = await fetch(http://localhost:5000/api/employees/${id}, {
      // ✅ BENAR - PAKAI INI
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Failed to update data!");
        return;
      }

      alert("Updated successfully!");
      router.push("/parttime-employee");

    } catch (err) {
      console.error(err);
      alert("connection to server failed!");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-800 p-2"
          title="Cancel Edit"
        >
          ×
        </button>

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
                    readOnly={field === "age"}
                  />
                  {errors[field] && (
                    <span className="text-red-600 text-sm mt-1">{errors[field]}</span>
                  )}
                </div>
              ))}
              
              {/* Marital Status - Dropdown */}
              <div>
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={employee.maritalStatus}
                  onChange={handleChange}
                  className="border p-2 rounded w-full bg-white"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="TK">TK</option>
                  <option value="K/01">K/01</option>
                  <option value="K/02">K/02</option>
                </select>
                {errors["maritalStatus"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["maritalStatus"]}</span>
                )}
              </div>

              {/* Training fields - col-span-2 */}
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

          {/* === Employment */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Employment Info</h2>

            <div className="grid grid-cols-2 gap-4">

              {[
                ["nik", "NIK"],
                ["npwp", "NPWP"],
                ["accountNumber", "Account Number"],
                ["position", "Position"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  {errors[field] && (
                    <span className="text-red-600 text-sm mt-1">{errors[field]}</span>
                  )}
                </div>
              ))}

              {/* MCU History */}
              <div>
                <label>MCU History</label>
                <input
                  type="date"
                  name="mcuHistory"
                  value={employee.mcuHistory}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {errors["mcuHistory"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["mcuHistory"]}</span>
                )}
              </div>

              {/* Division */}
              <div>
                <label>Division</label>
                <select
                  name="division"
                  value={employee.division}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="" disabled>Select Division</option>
                  <option value="Overhead">Overhead</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="EPC 1">EPC 1</option>
                  <option value="EPC 2">EPC 2</option>
                </select>
                {errors["division"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["division"]}</span>
                )}
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
                {errors["dateJoin"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["dateJoin"]}</span>
                )}
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
                  <option value="" disabled>Select Department</option>
                  <option value="1">HRD</option>
                  <option value="2">Finance</option>
                  <option value="3">Business Development</option>
                </select>
                {errors["department"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["department"]}</span>
                )}
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
                {errors["dateEnd"] && (
                  <span className="text-red-600 text-sm mt-1">{errors["dateEnd"]}</span>
                )}
              </div>
            </div>
          </section>

          {/* Payroll */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Payroll</h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["salaryAllIn", "Salary All In"],
                ["fixedAllowance", "Fixed Allowance"],
                ["salaryBasic", "Salary Basic"],
                ["nonFixedAllowance", "Non Fixed Allowance"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label>{label}</label>
                  <input
                    name={field}
                    value={(employee as any)[field] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  {errors[field] && (
                    <span className="text-red-600 text-sm mt-1">{errors[field]}</span>
                  )}
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
                  {errors[field] && (
                    <span className="text-red-600 text-sm mt-1">{errors[field]}</span>
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
                ["ktp", "Identity Card (KTP)"],
                ["npwpFile", "Tax Number (NPWP)"],
                ["bpjsKesehatan", "BPJS Health Insurance"],
                ["bpjsKetenagakerjaan", "BPJS Employment Insurance"],
                ["kartukeluarga", "Family Card (KK)"],
                ["sertifikattraining", "Training Certificate"],
                ["hasilmcu", "Medical Check Up Result"],
                ["cvkaryawan", "CV / Resume"],
                ["degreeCertificate", "Degree Certificate / Ijazah"]
              ].map(([name, label]) => (
                <div key={name} className="flex flex-col">
                  <label className="font-semibold mb-1 text-gray-800">{label}</label>

                  {/* File input */}
                  <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700 border border-gray-400 rounded-md cursor-pointer bg-gray-100 
            file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
            file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500"
                  />

                  {/* Nama file lama */}
                  {employee.files[name] && typeof employee.files[name] === "string" && (
                    <span className="text-gray-600 text-sm mt-1">
                      Current file: {employee.files[name]}
                    </span>
                  )}

                  {/* Nama file baru */}
                  {fileNames[name] && (
                    <span className="text-gray-600 text-sm mt-1">
                      Selected file: {fileNames[name]}
                    </span>
                  )}

                  {/* Error */}
                  {errors[name] && (
                    <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
                  )}
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