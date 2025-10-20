"use client";
import React from "react";

export default function EmployeeDetail() {
  return (
    <div
      className="min-h-screen bg-gray-100 font-sans"
      style={{ fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}
    >
      {/* Header */}
      <header className="bg-yellow-300 border-b border-black h-16 flex items-center justify-between px-10 py-12 shadow-md">
        <div className="flex items-center gap-6">
          <img
            src="/image/logo simkarin.png"
            alt="Logo"
            className="w-30 h-30 rounded-sm object-cover"
          />
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
            Employee Form
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="notifications"
            className="p-2 rounded-full hover:bg-yellow-200"
          >
            🔔
          </button>
          <button
            aria-label="profile"
            className="p-2 rounded-full hover:bg-yellow-200"
          >
            👤
          </button>
          <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-full shadow">
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-yellow-300 to-yellow-200 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              🏠
            </div>
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              📁
            </div>
            <span className="text-sm font-medium">Fulltime Employee</span>
          </div>

          <div className="flex items-center gap-3 hover:bg-yellow-200 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              📁
            </div>
            <span className="text-sm font-medium">Parttime Employee</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-8 relative flex justify-start">
          <div className="max-w-6xl w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <h2 className="text-xl font-medium">Employee Form</h2>
            </div>

            {/* Biodata Section */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left column with photo */}
              <div className="flex flex-col items-start pl-10">
                <div className="w-48 h-64 bg-gray-200 border border-gray-400 flex items-center justify-center mb-6">
                  <span className="text-gray-500 text-sm">Photo</span>
                </div>
              </div>

              {/* Right column with biodata */}
              <div className="space-y-8 -ml-35 w-[100%]">
                {/* Biodata */}
                <section>
                  <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">
                    Biodata
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <p>Name:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Biological Mother's Name:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Address:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Religion:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Date Of Birth:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Age:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Place Of Birth:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Marital Status:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Phone Number:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Identity Number:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Last Education:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                  </div>
                </section>

                {/* Employment Info */}
                <section>
                  <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">
                    Employment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <p>NIK:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>NPWP:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Account Number:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Division:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Date On Join:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Department:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Date Of End:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Position:</p> <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>MCU History:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Training List:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                  </div>
                </section>

                {/* Payroll Info */}
                <section>
                  <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">
                    Payroll Information
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <p>All In Salary:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Fixed Allowance:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Basic Salary:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>Irregular Allowance:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                  </div>
                </section>

                {/* Employee Benefit */}
                <section>
                  <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">
                    Employee Benefit
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <p>BPJS Employment:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                    <p>BPJS Health:</p>{" "}
                    <p className="bg-yellow-100 px-2 py-1 rounded"></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
