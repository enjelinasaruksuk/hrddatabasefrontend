"use client";

interface EmployeeStatsProps {
  fulltime: number;
  parttime: number;
}

export default function EmployeeStats({ fulltime, parttime }: EmployeeStatsProps) {
  const total = fulltime + parttime;
  const fulltimePercent = total ? Math.round((fulltime / total) * 100) : 0;
  const parttimePercent = total ? Math.round((parttime / total) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-6 shadow-md w-full border border-yellow-200">
      <h2 className="font-semibold text-lg mb-4 text-gray-800">Employee Statistics</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1 text-gray-700">
            Fulltime Employees{" "}
            <span className="text-gray-600">
              {fulltime} ({fulltimePercent}%)
            </span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-500 h-2.5 rounded-full"
              style={{ width: `${fulltimePercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1 text-gray-700">
            Parttime Employees{" "}
            <span className="text-gray-600">
              {parttime} ({parttimePercent}%)
            </span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-300 h-2.5 rounded-full"
              style={{ width: `${parttimePercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
