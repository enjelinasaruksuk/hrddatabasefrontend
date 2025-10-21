"use client";
import Layout from "../components/Layout";

export default function ReminderPage() {
  return (
    <Layout>
      <div className="p-6 font-['Cambria'] text-gray-800">
        {/* Header Title */}
        <h1 className="text-2xl font-bold mb-6">Reminder</h1>

        {/* Urgent Section */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Urgent – Follow up immediately
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* End of Contract */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-3">End of Contract</h3>
              <p>
                <span className="font-semibold">Name:</span> Dewi Lestari
              </p>
              <p>
                <span className="font-semibold">Position:</span> Marketing staff
              </p>
              <p>
                <span className="font-semibold">End of Contract:</span> 5 days
                left
              </p>
            </div>

            {/* Expired Certificate */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-3">Expired Certificate</h3>
              <p>
                <span className="font-semibold">Name:</span> Rudi Hartono
              </p>
              <p>
                <span className="font-semibold">Certificate:</span> Umn K3
                Certificate
              </p>
              <p>
                <span className="font-semibold">Expired Certificate:</span> 7
                days left
              </p>
            </div>
          </div>
        </section>

        {/* Attention Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Attention – Within 30 Days
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* End of Contract */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-3">End of Contract</h3>
              <p>
                <span className="font-semibold">Name:</span> Dewi Lestari
              </p>
              <p>
                <span className="font-semibold">Position:</span> Marketing staff
              </p>
              <p>
                <span className="font-semibold">End of Contract:</span> 5 days
                left
              </p>
            </div>

            {/* Expired Certificate */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-3">Expired Certificate</h3>
              <p>
                <span className="font-semibold">Name:</span> Rudi Hartono
              </p>
              <p>
                <span className="font-semibold">Certificate:</span> Umn K3
                Certificate
              </p>
              <p>
                <span className="font-semibold">Expired Certificate:</span> 7
                days left
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
