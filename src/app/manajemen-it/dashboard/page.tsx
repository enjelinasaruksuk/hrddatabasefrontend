"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    fulltime: 0,
    parttime: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:5000/api/employees/count");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();

        const fulltimeCount = Number(data.fulltime) || 0;
        const parttimeCount = Number(data.parttime) || 0;

        setStats({
          total: fulltimeCount + parttimeCount,
          fulltime: fulltimeCount,
          parttime: parttimeCount,
        });
      } catch (err) {
        console.error("Error fetching employee stats:", err);
        setError("Failed to load employee statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = [
    { name: "Full-time", value: stats.fulltime },
    { name: "Part-time", value: stats.parttime },
  ];

  // 🎨 Warna yang cocok dengan layout kuning: Yellow + Teal/Emerald
  const COLORS = ["#eab308", "#14b8a6"];

  const fulltimePercent = stats.total > 0 ? ((stats.fulltime / stats.total) * 100).toFixed(0) : 0;
  const parttimePercent = stats.total > 0 ? ((stats.parttime / stats.total) * 100).toFixed(0) : 0;

  return (
    <Layout>
      <section className="p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <div className="w-2 h-10 bg-gradient-to-b from-yellow-500 to-teal-500 rounded-full mr-4"></div>
          Employee Distribution Overview
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-yellow-600 font-medium text-lg">Loading employee statistics...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-red-600 font-medium text-lg">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={400}>
              {stats.total > 0 ? (
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #eab308',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 12px rgba(234, 179, 8, 0.2)'
                    }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '14px', fontWeight: '600' }}
                  />
                </PieChart>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="text-gray-500 font-medium">No employee data available</div>
                </div>
              )}
            </ResponsiveContainer>
            
            {/* Statistics Cards */}
            <div className="space-y-5">
              {/* Full-time Card - Yellow theme */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-800 font-bold text-lg">Full-time Employees</span>
                  <span className="text-3xl font-extrabold text-yellow-600">{stats.fulltime}</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full transition-all duration-1000 shadow-md"
                    style={{ width: `${fulltimePercent}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-yellow-700 font-semibold">{fulltimePercent}% of total workforce</div>
              </div>

              {/* Part-time Card - Teal theme */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-6 shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-800 font-bold text-lg">Part-time Employees</span>
                  <span className="text-3xl font-extrabold text-teal-600">{stats.parttime}</span>
                </div>
                <div className="w-full bg-teal-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-teal-600 h-4 rounded-full transition-all duration-1000 shadow-md"
                    style={{ width: `${parttimePercent}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-teal-700 font-semibold">{parttimePercent}% of total workforce</div>
              </div>

              {/* Total Card - Gradient Yellow to Teal */}
              <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-teal-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 font-medium mb-1">Total Workforce</div>
                    <div className="text-4xl font-extrabold">{stats.total}</div>
                    <div className="text-xs opacity-75 mt-1">Active Employees</div>
                  </div>
                  <Users className="w-16 h-16 opacity-90" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}