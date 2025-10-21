"use client";

interface StatsProps {
  active: number;
  contract: number;
}

export default function EmployeeStats({ active, contract }: StatsProps) {
  const total = active + contract;
  const activePercent = Math.round((active / total) * 100);
  const contractPercent = Math.round((contract / total) * 100);

  return (
    <div className="bg-[#FFF0C9] rounded-xl p-6 shadow-sm w-full">
      <h2 className="font-semibold text-lg mb-4">Employee Statistics</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">
            Total Active Employees <span className="text-gray-600">{active} ({activePercent}%)</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${activePercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">
            Total Contract Employees <span className="text-gray-600">{contract} ({contractPercent}%)</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-300 h-2.5 rounded-full"
              style={{ width: `${contractPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
