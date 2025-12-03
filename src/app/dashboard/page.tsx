"use client";

import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeStats from "../components/EmployeeStats";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    fulltime: 0,
    parttime: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees/count");
        const data = await res.json();

        // Pastikan data dikonversi ke number
        const fulltimeCount = Number(data.fulltime) || 0;
        const parttimeCount = Number(data.parttime) || 0;

        setStats({
          total: fulltimeCount + parttimeCount,
          fulltime: fulltimeCount,
          parttime: parttimeCount,
        });
      } catch (error) {
        console.error("Error fetching employee stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <section>
        <h1 className="text-2xl font-bold mb-6">Welcome To Dashboard HRD!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmployeeCard total={stats.total} />
          <EmployeeStats
            fulltime={stats.fulltime}
            parttime={stats.parttime}
          />
        </div>
      </section>
    </Layout>
  );
}
