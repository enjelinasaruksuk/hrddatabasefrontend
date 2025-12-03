"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function ReminderPage() {
  const [urgentList, setUrgentList] = useState([]);
  const [attentionList, setAttentionList] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();

    const today = new Date();

    const urgent = [];
    const attention = [];

    data.forEach((emp) => {
      const endDate = new Date(emp.date_end);
      const timeDiff = endDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // beda hari

      if (dayDiff <= 7 && dayDiff >= 0) {
        urgent.push({ ...emp, daysLeft: dayDiff });
      } else if (dayDiff <= 30 && dayDiff > 7) {
        attention.push({ ...emp, daysLeft: dayDiff });
      }
    });

    setUrgentList(urgent);
    setAttentionList(attention);
  };

  return (
    <Layout>
      <div className="p-6 font-['Cambria'] text-gray-800">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Reminder</h1>

        {/* URGENT */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-yellow-700">
            Urgent – Follow up immediately
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentList.map((emp, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-yellow-100 to-white border border-yellow-200 rounded-lg p-5 shadow-md"
              >
                <h3 className="font-semibold mb-3 text-gray-800">
                  End of Contract
                </h3>
                <p><strong>Name:</strong> {emp.name}</p>
                <p><strong>Position:</strong> {emp.position}</p>
                <p><strong>End of Contract:</strong> {emp.daysLeft} days left</p>
              </div>
            ))}
          </div>
        </section>

        {/* ATTENTION */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-yellow-700">
            Attention – Within 30 Days
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attentionList.map((emp, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-yellow-100 to-white border border-yellow-200 rounded-lg p-5 shadow-md"
              >
                <h3 className="font-semibold mb-3 text-gray-800">
                  End of Contract
                </h3>
                <p><strong>Name:</strong> {emp.name}</p>
                <p><strong>Position:</strong> {emp.position}</p>
                <p><strong>End of Contract:</strong> {emp.daysLeft} days left</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
