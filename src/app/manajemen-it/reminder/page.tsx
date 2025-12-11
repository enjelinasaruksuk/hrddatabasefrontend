"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function ReminderPage() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reminder/contracts")
      .then((res) => res.json())
      .then((data) => setContracts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleShowDetail = (item: any) => {
    localStorage.setItem("contractDetail", JSON.stringify(item));

    // ➕ Tambahan untuk highlight di halaman berikutnya
    localStorage.setItem("selectedContractId", item.id);

    window.dispatchEvent(new Event("contract-detail-update"));
    window.location.href = "/contract-employee";
  };

  const urgentContracts = contracts.filter((c: any) => c.days_left <= 7);
  const attentionContracts = contracts.filter(
    (c: any) => c.days_left > 7 && c.days_left <= 30
  );

  return (
    <Layout>
      <div className="p-6 font-['Cambria'] text-gray-800">
        <h1 className="text-2xl font-bold mb-6">Reminder</h1>

        {/* Urgent TABLE */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Urgent – Follow up immediately
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-yellow-300">
                <tr>
                  <th className="border border-gray-400 px-3 py-2">No</th>
                  <th className="border border-gray-400 px-3 py-2">Name</th>
                  <th className="border border-gray-400 px-3 py-2">Position</th>
                  <th className="border border-gray-400 px-3 py-2">Days Left</th>
                  <th className="border border-gray-400 px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {urgentContracts.map((item: any, index: number) => (
                  <tr key={index} className="bg-yellow-100">
                    <td className="border border-gray-400 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      {item.position}
                    </td>
                    <td className="border border-gray-400 px-3 py-2 font-semibold text-red-600">
                      {item.days_left} days
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <button
                        onClick={() => handleShowDetail(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Show Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {urgentContracts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-400 px-3 py-2 text-center italic"
                    >
                      No urgent contracts
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Attention TABLE */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Attention – Within 30 Days
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-yellow-300">
                <tr>
                  <th className="border border-gray-400 px-3 py-2">No</th>
                  <th className="border border-gray-400 px-3 py-2">Name</th>
                  <th className="border border-gray-400 px-3 py-2">Position</th>
                  <th className="border border-gray-400 px-3 py-2">Days Left</th>
                  <th className="border border-gray-400 px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {attentionContracts.map((item: any, index: number) => (
                  <tr key={index} className="bg-yellow-100">
                    <td className="border border-gray-400 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      {item.position}
                    </td>
                    <td className="border border-gray-400 px-3 py-2 text-orange-600 font-semibold">
                      {item.days_left} days
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <button
                        onClick={() => handleShowDetail(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Show Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {attentionContracts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-400 px-3 py-2 text-center italic"
                    >
                      No contracts within 30 days
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
