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

  const COLORS = ["#f59e0b", "#fbbf24"];

  const fulltimePercent = stats.total > 0 ? ((stats.fulltime / stats.total) * 100).toFixed(0) : 0;
  const parttimePercent = stats.total > 0 ? ((stats.parttime / stats.total) * 100).toFixed(0) : 0;

  return (
    <Layout>
      <section>
        {/* Pie Chart - Employee Distribution */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-10 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-3"></div>
            Employee Distribution Overview
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-amber-600 font-medium">Loading employee statistics...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <ResponsiveContainer width="100%" height={350}>
                {stats.total > 0 ? (
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // Perbaikan error 'percent' is possibly 'undefined'
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #f59e0b',
                        borderRadius: '12px',
                        padding: '12px'
                      }} 
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-gray-500 font-medium">No employee data available</div>
                  </div>
                )}
              </ResponsiveContainer>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-amber-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Full-time Employees</span>
                    <span className="text-2xl font-bold text-amber-600">{stats.fulltime}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${fulltimePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-yellow-400">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Part-time Employees</span>
                    <span className="text-2xl font-bold text-yellow-600">{stats.parttime}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${parttimePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Total Workforce</div>
                      <div className="text-3xl font-bold">{stats.total}</div>
                    </div>
                    <Users className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}