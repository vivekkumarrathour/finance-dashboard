import { FinanceProvider, useFinance } from './context/FinanceContext';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import CategoryChart from './components/CategoryChart';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';

function DashboardPage() {
  return (
    <>
      <SummaryCards />
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        <div style={{ minWidth: 0 }}>
          <BalanceChart />
        </div>
        <div style={{ minWidth: 0 }}>
          <CategoryChart />
        </div>
      </div>
    </>
  );
}

function AppContent() {
  const { activeTab } = useFinance();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="dashboard-container" style={{ flex: 1, paddingTop: '24px', paddingBottom: '40px' }}>
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'insights' && <Insights />}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '20px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <p>
          FinanceFlow © {new Date().getFullYear()} — Built with React, Recharts & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
