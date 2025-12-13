"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import EmployeeDetailView from "src/app/manajemen-it/components/EmployeeDetailView";

export default function ManajemenITParttimeEmployeeDetail() {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const nik = params.id;

  useEffect(() => {
    if (!nik) return;

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ PERBAIKAN: Gunakan kurung biasa dengan backtick
        const response = await fetch(`http://localhost:5000/api/employees/${nik}`);
        
        // ✅ PERBAIKAN: Gunakan kurung biasa dengan backtick
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("📥 Data employee:", data); // Debug: lihat data yang diterima
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
    return (
      <div className="p-10 text-lg font-semibold text-center">
        Memuat data karyawan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-lg font-semibold text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-10 text-lg font-semibold text-center text-red-600">
        Data karyawan tidak ditemukan
      </div>
    );
  }

  return (
    <div className="relative">
      <EmployeeDetailView 
        employee={employee} 
        basePath="/manajemen-it" 
        isGradient={true} 
      />
      
      <div className="absolute top-[550px] left-[360px] z-10">
        <button
          // ✅ PERBAIKAN: Gunakan kurung biasa dengan backtick
          onClick={() => router.push(`/manajemen-it/parttime-employee/document/${nik}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200 shadow-lg"
        >
          Supporting Files
        </button>
      </div>
    </div>
  );
}