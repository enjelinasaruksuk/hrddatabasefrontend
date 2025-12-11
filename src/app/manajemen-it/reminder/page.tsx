"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function ReminderPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [training, setTraining] = useState<any[]>([]);

  // ================= FETCH CONTRACT =================
  useEffect(() => {
    fetch("http://localhost:5000/api/reminder/contracts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) return setContracts(data);
        if (Array.isArray(data.data)) return setContracts(data.data);
        if (Array.isArray(data.contracts)) return setContracts(data.contracts);
        setContracts([]);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ================= FETCH TRAINING =================
  useEffect(() => {
    fetch("http://localhost:5000/api/reminder/training")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) return setTraining(data);
        if (Array.isArray(data.data)) return setTraining(data.data);
        if (Array.isArray(data.training)) return setTraining(data.training);
        setTraining([]);
      })
      .catch((err) => console.error("Training fetch error:", err));
  }, []);

  const handleShowDetail = (item: any) => {
    localStorage.setItem("contractDetail", JSON.stringify(item));
    localStorage.setItem("selectedContractId", item.id);

    window.dispatchEvent(new Event("contract-detail-update"));
    window.location.href = "/contract-employee";
  };

  // ================= FILTER CONTRACT =================
  const urgentContracts = contracts.filter((c) => c.days_left <= 7);
  const attentionContracts = contracts.filter(
    (c) => c.days_left > 7 && c.days_left <= 30
  );

  // ================= FILTER TRAINING =================
  const urgentTraining = training.filter((t) => t.days_left <= 7);
  const attentionTraining = training.filter(
    (t) => t.days_left > 7 && t.days_left <= 30
  );

  return (
    <Layout>
      <div className="p-6 font-['Cambria'] text-gray-800">

        <h1 className="text-2xl font-bold mb-6">Reminder</h1>

        {/* ===================================== */}
        {/* URGENT CONTRACT */}
        {/* ===================================== */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Urgent – Follow up immediately
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-yellow-300">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Position</th>
                  <th className="border px-3 py-2">Days Left</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {urgentContracts.map((item, index) => (
                  <tr key={index} className="bg-yellow-100">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.name}</td>
                    <td className="border px-3 py-2">{item.position}</td>
                    <td className="border px-3 py-2 text-red-600 font-semibold">
                      {item.days_left} days
                    </td>
                    <td className="border px-3 py-2">
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
                    <td colSpan={5} className="border px-3 py-2 text-center italic">
                      No urgent contracts
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================== */}
        {/* CONTRACT WITHIN 30 DAYS */}
        {/* ===================================== */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Attention – Within 30 Days
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-yellow-300">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Position</th>
                  <th className="border px-3 py-2">Days Left</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {attentionContracts.map((item, index) => (
                  <tr key={index} className="bg-yellow-100">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.name}</td>
                    <td className="border px-3 py-2">{item.position}</td>
                    <td className="border px-3 py-2 text-orange-600 font-semibold">
                      {item.days_left} days
                    </td>
                    <td className="border px-3 py-2">
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
                    <td colSpan={5} className="border px-3 py-2 text-center italic">
                      No contracts within 30 days
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================== */}
        {/* TRAINING URGENT (ORANGE THEME) */}
        {/* ===================================== */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Training Certificate – Urgent (Expired ≤ 7 Days)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-orange-300">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Position</th>
                  <th className="border px-3 py-2">Training</th>
                  <th className="border px-3 py-2">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {urgentTraining.map((item, index) => (
                  <tr key={index} className="bg-orange-100">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.name}</td>
                    <td className="border px-3 py-2">{item.position}</td>
                    <td className="border px-3 py-2">{item.training_name}</td>
                    <td className="border px-3 py-2 text-red-600 font-bold">
                      {item.days_left} days
                    </td>
                  </tr>
                ))}

                {urgentTraining.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border px-3 py-2 text-center italic">
                      No urgent training
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================== */}
        {/* TRAINING 30 DAYS (ORANGE THEME) */}
        {/* ===================================== */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Training Certificate – Within 30 Days
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-orange-300">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Position</th>
                  <th className="border px-3 py-2">Training</th>
                  <th className="border px-3 py-2">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {attentionTraining.map((item, index) => (
                  <tr key={index} className="bg-orange-100">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.name}</td>
                    <td className="border px-3 py-2">{item.position}</td>
                    <td className="border px-3 py-2">{item.training_name}</td>
                    <td className="border px-3 py-2 text-orange-600 font-bold">
                      {item.days_left} days
                    </td>
                  </tr>
                ))}

                {attentionTraining.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border px-3 py-2 text-center italic">
                      No training expiring within 30 days
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
