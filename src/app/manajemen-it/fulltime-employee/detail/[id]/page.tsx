"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import EmployeeDetailView from "src/app/components/EmployeeDetailView";

export default function ManajemenITFulltimeEmployeeDetail() {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nik = params.id;

  useEffect(() => {
    if (!nik) return;

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/employees/${nik}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError(err instanceof Error ? err.message : "Gagal memuat data karyawan");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [nik]);

  if (loading) {
    return <div className="p-10 text-lg font-semibold text-center">Memuat data karyawan...</div>;
  }

  if (error) {
    return <div className="p-10 text-lg font-semibold text-center text-red-600">Error: {error}</div>;
  }

  if (!employee) {
    return <div className="p-10 text-lg font-semibold text-center text-red-600">Data karyawan tidak ditemukan</div>;
  }

  return <EmployeeDetailView employee={employee} basePath="/manajemen-it" isGradient={true} />;
}