import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_ICONS } from '../data/mockData';
import { X } from 'lucide-react';

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useFinance();
  const isEditing = !!transaction;

  const [form, setForm] = useState({
    date: transaction?.date || new Date().toISOString().slice(0, 10),
    amount: transaction?.amount || '',
    category: transaction?.category || 'Salary',
    type: transaction?.type || 'income',
    description: transaction?.description || '',
  });

  const [errors, setErrors] = useState({});

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (type) => {
    const cats = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setForm((prev) => ({
      ...prev,
      type,
      category: cats.includes(prev.category) ? prev.category : cats[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (isEditing) {
      updateTransaction({ ...data, id: transaction.id });
    } else {
      addTransaction(data);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
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
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Type
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['income', 'expense'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: form.type === type ? 'none' : '1px solid var(--border-color)',
                    background: form.type === type
                      ? (type === 'income' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f43f5e, #e11d48)')
                      : 'var(--bg-tertiary)',
                    color: form.type === type ? 'white' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {type === 'income' ? '↗ Income' : '↘ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Amount & Date Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Amount ($)
              </label>
              <input
                type="number"
                className="input-field"
                value={form.amount}
                onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.amount && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '4px' }}>{errors.amount}</p>}
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Date
              </label>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
              {errors.date && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '4px' }}>{errors.date}</p>}
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Category
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: cat }))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: form.category === cat ? '2px solid #3b82f6' : '1px solid var(--border-color)',
                    background: form.category === cat ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)',
                    color: form.category === cat ? '#3b82f6' : 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {CATEGORY_ICONS[cat]} {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Description
            </label>
            <input
              type="text"
              className="input-field"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="e.g. Monthly rent payment"
            />
            {errors.description && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '4px' }}>{errors.description}</p>}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
