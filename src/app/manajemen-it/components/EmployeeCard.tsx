"use client";

import { Users } from "lucide-react";

interface EmployeeCardProps {
  total: number;
}

export default function EmployeeCard({ total }: EmployeeCardProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-6 shadow-md flex flex-col justify-center items-center w-full border border-yellow-200">
      <div className="flex items-center gap-2 mb-3">
        <Users className="text-yellow-700" />
        <h2 className="font-semibold text-lg text-gray-800">Total Employees</h2>
      </div>
      <p className="text-5xl font-bold text-gray-900">{total}</p>
      <p className="text-sm mt-2 text-gray-600">Total Active Employees</p>
    </div>
  );
}
