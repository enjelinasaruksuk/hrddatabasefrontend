"use client";

import React, { useEffect, useState } from "react";

export default function EditEmployeeForm() {
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    // Simulasi fetch data employee
    setTimeout(() => {
      setEmployee({
        name: "John Doe",
        motherName: "Jane Doe",
        address: "Jl. Mawar No. 123",
        religion: "Islam",
        dateOfBirth: "1990-01-01",
        age: "35",
        placeOfBirth: "Jakarta",
        maritalStatus: "Married",
        phoneNumber: "08123456789",
        identityNumber: "1234567890",
        lastEducation: "S1 Informatika",
        nik: "987654321",
        npwp: "123456789",
        accountNumber: "1122334455",
        division: "IT",
        department: "Development",
        dateOnJoin: "2020-01-01",
        dateOfEnd: "2025-01-01",
        position: "Software Engineer",
        mcuHistory: "Normal",
        trainingList: "React, Next.js",
        allInSalary: "10.000.000",
        fixedAllowance: "2.000.000",
        basicSalary: "8.000.000",
        irregularAllowance: "500.000",
        bpjsEmployment: "Aktif",
        bpjsHealth: "Aktif",
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-200 flex items-center justify-center p-10">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Edit Employee Form
        </h2>

        <form className="grid grid-cols-2 gap-6">
          {/* Left side */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Name</label>
              <input
                defaultValue={employee?.name}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Mother Name</label>
              <input
                defaultValue={employee?.motherName}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Address</label>
              <input
                defaultValue={employee?.address}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Religion</label>
              <input
                defaultValue={employee?.religion}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Date of Birth</label>
              <input
                type="date"
                defaultValue={employee?.dateOfBirth}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Age</label>
              <input
                defaultValue={employee?.age}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Place of Birth</label>
              <input
                defaultValue={employee?.placeOfBirth}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Marital Status</label>
              <input
                defaultValue={employee?.maritalStatus}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Phone Number</label>
              <input
                defaultValue={employee?.phoneNumber}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Identity Number</label>
              <input
                defaultValue={employee?.identityNumber}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Last Education</label>
              <input
                defaultValue={employee?.lastEducation}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Division</label>
              <input
                defaultValue={employee?.division}
                className="w-full border border-yellow-300 rounded p-2 bg-white"
              />
            </div>
          </div>
        </form>

        <div className="text-center mt-8">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
