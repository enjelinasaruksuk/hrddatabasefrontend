"use client";
import Layout from "./components/Layout";


export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p>Selamat datang di dashboard HRD. Anda dapat melihat data karyawan secara keseluruhan di sini.</p>
      </div>
    </Layout>
  );
}
