"use client";
import React from "react";

export default function AddEmployee() {
  return (
    <div
      className="min-h-screen bg-yellow-50 flex justify-center items-start py-10"
      style={{ fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}
    >
      <main className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-black">
          Add Employee Data
        </h1>

        <form className="space-y-10">
          {/* Biodata */}
          <section>
            <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1 text-black">
              Biodata
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700">Name</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
<<<<<<< Updated upstream
                <label className="text-gray-700">Mothers Name</label>
=======
                <label className="text-gray-700">Mother's Name</label>
>>>>>>> Stashed changes
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Address</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Religion</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  className="w-full border border-yellow-300 rounded p-2 bg-white"
                />
              </div>
              <div>
                <label className="text-gray-700">Age</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Place of Birth</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Marital Status</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Phone Number</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Identity Number</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Last Education</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
            </div>
          </section>

          {/* Employment Info */}
          <section>
            <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1 text-black">
              Employment Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700">NIK</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">NPWP</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Account Number</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>

              {/* Dropdown Division */}
              <div>
                <label className="text-gray-700">Division</label>
                <select className="w-full border border-yellow-300 rounded p-2 bg-white">
                  <option value="">-- Select Division --</option>
                  <option value="Overhead">Overhead</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="EPC 1">EPC 1</option>
                  <option value="EPC 2">EPC 2</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700">Date On Join</label>
                <input
                  type="date"
                  className="w-full border border-yellow-300 rounded p-2 bg-white"
                />
              </div>

              {/* Dropdown Department */}
              <div>
                <label className="text-gray-700">Department</label>
                <select className="w-full border border-yellow-300 rounded p-2 bg-white">
                  <option value="">-- Select Department --</option>
                  <option value="HRD">HRD</option>
                  <option value="Finance">Finance</option>
                  <option value="Business Development">
                    Business Development
                  </option>
                </select>
              </div>

              <div>
                <label className="text-gray-700">Date Of End</label>
                <input
                  type="date"
                  className="w-full border border-yellow-300 rounded p-2 bg-white"
                />
              </div>
              <div>
                <label className="text-gray-700">Position</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">MCU History</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Training List</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
            </div>
          </section>

          {/* Payroll */}
          <section>
            <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1 text-black">
              Payroll Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700">All In Salary</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Fixed Allowance</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Basic Salary</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">Irregular Allowance</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
            </div>
          </section>

          {/* Employee Benefit */}
          <section>
            <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1 text-black">
              Employee Benefit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700">BPJS Employment</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
              <div>
                <label className="text-gray-700">BPJS Health</label>
                <input className="w-full border border-yellow-300 rounded p-2 bg-white" />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
