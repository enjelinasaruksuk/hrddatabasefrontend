"use client";

interface StatsProps {
  fulltime: number;
  parttime: number;
}

export default function EmployeeStats({ fulltime, parttime }: StatsProps) {
  const total = fulltime + parttime;
  const fulltimePercent = total ? Math.round((fulltime / total) * 100) : 0;
  const parttimePercent = total ? Math.round((parttime / total) * 100) : 0;

  return (
    <div className="bg-[#FFF0C9] rounded-xl p-6 shadow-sm w-full">
      <h2 className="font-semibold text-lg mb-4">Employee Statistics</h2>

      <div className="space-y-4">
        {/* FULLTIME */}
        <div>
          <p className="text-sm font-medium mb-1">
            Fulltime Employees <span className="text-gray-600">{fulltime} ({fulltimePercent}%)</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${fulltimePercent}%` }}></div>
          </div>
        </div>

        {/* PARTTIME */}
        <div>
          <p className="text-sm font-medium mb-1">
            Parttime Employees <span className="text-gray-600">{parttime} ({parttimePercent}%)</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-300 h-2.5 rounded-full" style={{ width: `${parttimePercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
