"use client";

import { Users } from "lucide-react";

interface EmployeeCardProps {
  total: number;
}

export default function EmployeeCard({ total }: EmployeeCardProps) {
  return (
    <div className="bg-[#FFF0C9] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center w-full">
      <div className="flex items-center gap-2 mb-3">
        <Users className="text-black" />
        <h2 className="font-semibold text-lg">Total Employees</h2>
      </div>
      <p className="text-5xl font-bold">{total}</p>
      <p className="text-sm mt-2 text-gray-700">Total Active Employees</p>
    </div>
  );
}
