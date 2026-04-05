import { useFinance } from '../context/FinanceContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { role, setRole, darkMode, toggleDarkMode, activeTab, setActiveTab } = useFinance();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'insights', label: 'Insights' },
  ];

  return (
    <header
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >

      {/* decoration part  */}
      <div className="dashboard-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            }}
          >
            FF
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Finance<span style={{ color: '#3b82f6' }}>Flow</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '4px' }} className="hidden md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#3b82f6' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Role selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-tertiary)',
              padding: '4px',
              borderRadius: 10,
            }}
            className="hidden sm:flex"
          >
            {['viewer', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: 'none',
                  background: role === r
                    ? (r === 'admin' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)')
                    : 'transparent',
                  color: role === r ? 'white' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  fontFamily: 'inherit',
                  boxShadow: role === r ? '0 2px 6px rgba(59, 130, 246, 0.25)' : 'none',
                }}
              >
                {r === 'admin' ? '🛡️ Admin' : '👁️ Viewer'}
              </button>
            ))}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fade-in"
          style={{
            padding: '0 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: 'none',
                background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)',
                color: activeTab === tab.id ? '#3b82f6' : 'var(--text-secondary)',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}

          {/* Mobile role selector */}
          <div className="sm:hidden" style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            {['viewer', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: 'none',
                  background: role === r
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'var(--bg-tertiary)',
                  color: role === r ? 'white' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontFamily: 'inherit',
                }}
              >
                {r === 'admin' ? '🛡️ Admin' : '👁️ Viewer'}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
