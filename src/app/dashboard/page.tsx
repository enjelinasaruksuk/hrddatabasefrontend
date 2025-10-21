import EmployeeCard from "../components/EmployeeCard";
import EmployeeStats from "../components/EmployeeStats";
import Layout from "../components/Layout";

export default function Dashboard() {
  const totalEmployees = 350;
  const activeEmployees = 245;
  const contractEmployees = 105;

  return (
    <Layout>
      <section>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmployeeCard total={totalEmployees} />
          <EmployeeStats
            active={activeEmployees}
            contract={contractEmployees}
          />
        </div>
      </section>
    </Layout>
  );
}
