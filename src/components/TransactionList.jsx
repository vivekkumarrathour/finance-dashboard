import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../data/mockData';
import TransactionModal from './TransactionModal';
import {
  Search,
  SlidersHorizontal,
  Plus,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Edit3,
  Trash2,
  Download,
  FileJson,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

export default function TransactionList() {
  const {
    filteredTransactions,
    filter,
    search,
    sort,
    role,
    setFilter,
    setSearch,
    setSort,
    deleteTransaction,
    exportData,
  } = useFinance();

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const isAdmin = role === 'admin';

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSort = (field) => {
    setSort({
      field,
      direction: sort.field === field && sort.direction === 'desc' ? 'asc' : 'desc',
    });
  };

  const SortIcon = ({ field }) => {
    if (sort.field !== field) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
    return sort.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  return (
    <>
      <div className="glass-card animate-slide-up" style={{ padding: '24px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Transactions
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Export button */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 14px' }}
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download size={14} />
                <span className="hidden sm:inline">Export</span>
              </button>
              {showExportMenu && (
                <div
                  className="animate-scale-in"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 6,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 12,
                    padding: '6px',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 20,
                    minWidth: 150,
                  }}
                >
                  <button
                    onClick={() => { exportData('csv'); setShowExportMenu(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => (e.target.style.background = 'var(--bg-tertiary)')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    <FileSpreadsheet size={14} /> Export CSV
                  </button>
                  <button
                    onClick={() => { exportData('json'); setShowExportMenu(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => (e.target.style.background = 'var(--bg-tertiary)')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    <FileJson size={14} /> Export JSON
                  </button>
                </div>
              )}
            </div>

            {/* Add button (Admin only) */}
            {isAdmin && (
              <button
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 14px' }}
                onClick={() => setShowModal(true)}
              >
                <Plus size={14} />
                <span className="hidden sm:inline">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters/Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 220px' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category, description, amount..."
              style={{ paddingLeft: 38 }}
            />
          </div>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-tertiary)', borderRadius: 10, padding: '3px' }}>
            {[
              { value: 'all', label: 'All' },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  border: 'none',
                  background: filter === f.value
                    ? (f.value === 'income' ? '#10b981' : f.value === 'expense' ? '#f43f5e' : '#3b82f6')
                    : 'transparent',
                  color: filter === f.value ? 'white' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {filteredTransactions.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <AlertCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p style={{ fontSize: '1rem', fontWeight: 600 }}>No transactions found</p>
            <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              {search || filter !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'Start by adding your first transaction'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            {/* Desktop table */}
            <table
              className="hidden md:table"
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 4px',
              }}
            >
              <thead>
                <tr>
                  {[
                    { field: 'date', label: 'Date' },
                    { field: 'category', label: 'Category' },
                    { field: null, label: 'Description' },
                    { field: 'amount', label: 'Amount' },
                    { field: null, label: 'Type' },
                  ].map((col, i) => (
                    <th
                      key={i}
                      onClick={() => col.field && handleSort(col.field)}
                      style={{
                        padding: '10px 14px',
                        textAlign: col.field === 'amount' ? 'right' : 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: col.field ? 'pointer' : 'default',
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {col.label}
                        {col.field && <SortIcon field={col.field} />}
                      </span>
                    </th>
                  ))}
                  {isAdmin && (
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="table-row-hover" style={{ borderRadius: 10 }}>
                    <td style={{ padding: '12px 14px', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {formatDate(t.date)}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: `${CATEGORY_COLORS[t.category]}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                          }}
                        >
                          {CATEGORY_ICONS[t.category] || '📋'}
                        </span>
                        {t.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '0.83rem', color: 'var(--text-secondary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.description}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ color: t.type === 'income' ? '#10b981' : '#f43f5e' }}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={t.type === 'income' ? 'badge badge-income' : 'badge badge-expense'}>
                        {t.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => handleEdit(t)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: '1px solid var(--border-color)',
                              background: 'var(--bg-tertiary)',
                              color: '#3b82f6',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            title="Edit"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: '1px solid var(--border-color)',
                              background: 'var(--bg-tertiary)',
                              color: '#f43f5e',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile card list */}
            <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Mobile sort buttons */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                <button
                  onClick={() => handleSort('date')}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  Date <SortIcon field="date" />
                </button>
                <button
                  onClick={() => handleSort('amount')}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  Amount <SortIcon field="amount" />
                </button>
              </div>

              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: '14px',
                    borderRadius: 14,
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `${CATEGORY_COLORS[t.category]}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        flexShrink: 0,
                      }}
                    >
                      {CATEGORY_ICONS[t.category] || '📋'}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.category}
                      </p>
                      <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {formatDate(t.date)} • {t.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: t.type === 'income' ? '#10b981' : '#f43f5e' }}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </p>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: 6, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(t)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: '#3b82f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Edit3 size={11} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: '#f43f5e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
