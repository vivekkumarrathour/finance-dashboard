import { useFinance } from '../context/FinanceContext';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Calendar,
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  Lightbulb,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

function CustomBarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const formatCurrency = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v);

  return (
    <div className="custom-tooltip">
      <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Spent: <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(payload[0].value)}</strong>
      </p>
    </div>
  );
}

export default function Insights() {
  const { transactions, categoryBreakdown, totalIncome, totalExpenses } = useFinance();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  // ─── Calculate Insights ──────────────────────────────────────
  // Highest spending category
  const sortedCategories = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a);
  const highestCategory = sortedCategories[0];
  const lowestCategory = sortedCategories[sortedCategories.length - 1];

  // Monthly breakdown
  const monthlyBreakdown = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expenses += t.amount;
    return acc;
  }, {});

  const months = Object.keys(monthlyBreakdown).sort();
  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  const currentData = monthlyBreakdown[currentMonth] || { income: 0, expenses: 0 };
  const previousData = monthlyBreakdown[previousMonth] || { income: 0, expenses: 0 };

  const expenseChangePercent = previousData.expenses > 0
    ? (((currentData.expenses - previousData.expenses) / previousData.expenses) * 100).toFixed(1)
    : 0;

  const incomeChangePercent = previousData.income > 0
    ? (((currentData.income - previousData.income) / previousData.income) * 100).toFixed(1)
    : 0;

  // Average daily spending
  const totalDays = transactions.filter((t) => t.type === 'expense').length || 1;
  const avgTransactionAmount = totalExpenses / totalDays;

  // Savings rate
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;

  // Top spending categories bar chart data
  const barData = sortedCategories.slice(0, 7).map(([name, value]) => ({
    name: name.length > 12 ? name.slice(0, 12) + '…' : name,
    fullName: name,
    value,
    fill: CATEGORY_COLORS[name] || '#94a3b8',
  }));

  // Monthly spending comparison
  const monthNames = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
  const getMonthLabel = (m) => m ? monthNames[m.split('-')[1]] + ' ' + m.split('-')[0] : 'N/A';

  // ─── Insight Cards ───────────────────────────────────────────
  const insightCards = [
    {
      title: 'Highest Spending',
      value: highestCategory ? highestCategory[0] : 'N/A',
      amount: highestCategory ? formatCurrency(highestCategory[1]) : '',
      icon: Zap,
      color: '#f43f5e',
      bgColor: 'rgba(244, 63, 94, 0.1)',
      emoji: highestCategory ? (CATEGORY_ICONS[highestCategory[0]] || '📋') : '📋',
      detail: highestCategory
        ? `${((highestCategory[1] / totalExpenses) * 100).toFixed(0)}% of total expenses`
        : '',
    },
    {
      title: 'Lowest Spending',
      value: lowestCategory ? lowestCategory[0] : 'N/A',
      amount: lowestCategory ? formatCurrency(lowestCategory[1]) : '',
      icon: Target,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      emoji: lowestCategory ? (CATEGORY_ICONS[lowestCategory[0]] || '📋') : '📋',
      detail: lowestCategory
        ? `${((lowestCategory[1] / totalExpenses) * 100).toFixed(0)}% of total expenses`
        : '',
    },
    {
      title: 'Expense Trend',
      value: `${Math.abs(expenseChangePercent)}%`,
      icon: parseFloat(expenseChangePercent) > 0 ? TrendingUp : TrendingDown,
      color: parseFloat(expenseChangePercent) > 0 ? '#f43f5e' : '#10b981',
      bgColor: parseFloat(expenseChangePercent) > 0 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
      detail: `Expenses ${parseFloat(expenseChangePercent) > 0 ? 'increased' : 'decreased'} from ${getMonthLabel(previousMonth)}`,
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: PieChartIcon,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      detail: `Saving ${formatCurrency(totalIncome - totalExpenses)} overall`,
    },
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Insight Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {insightCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass-card animate-slide-up stagger-${idx + 1}`}
              style={{ padding: '20px', cursor: 'default' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: card.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                {card.emoji && (
                  <span style={{ fontSize: '1.5rem' }}>{card.emoji}</span>
                )}
              </div>
              <p style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '4px' }}>
                {card.title}
              </p>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                {card.value}
              </p>
              {card.amount && (
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: card.color, marginBottom: '4px' }}>
                  {card.amount}
                </p>
              )}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {card.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two-column layout: Bar chart + Tips */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        {/* Top Spending Categories Bar Chart */}
        <div className="glass-card animate-slide-up stagger-5" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <BarChart3 size={18} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Top Spending Categories
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Your highest expense areas
            </p>
          </div>

          {barData.length > 0 ? (
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" opacity={0.5} />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}
                    width={100}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.5 }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {barData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No data available</p>
          )}
        </div>

        {/* Financial Tips / Observations */}
        <div className="glass-card animate-slide-up stagger-6" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Lightbulb size={18} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Financial Observations
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Monthly comparison */}
            <div
              style={{
                padding: '16px',
                borderRadius: 14,
                background: parseFloat(expenseChangePercent) > 0 ? 'rgba(244, 63, 94, 0.06)' : 'rgba(16, 185, 129, 0.06)',
                border: `1px solid ${parseFloat(expenseChangePercent) > 0 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Monthly Comparison
                </span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                Your expenses {parseFloat(expenseChangePercent) > 0 ? 'increased' : 'decreased'} by{' '}
                <strong style={{ color: parseFloat(expenseChangePercent) > 0 ? '#f43f5e' : '#10b981' }}>
                  {Math.abs(expenseChangePercent)}%
                </strong>{' '}
                compared to {getMonthLabel(previousMonth)}.
                {parseFloat(expenseChangePercent) > 0
                  ? ' Consider reviewing your spending habits.'
                  : ' Great job managing your expenses!'}
              </p>
            </div>

            {/* Income trend */}
            <div
              style={{
                padding: '16px',
                borderRadius: 14,
                background: parseFloat(incomeChangePercent) >= 0 ? 'rgba(16, 185, 129, 0.06)' : 'rgba(244, 63, 94, 0.06)',
                border: `1px solid ${parseFloat(incomeChangePercent) >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Income Trend
                </span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                Your income {parseFloat(incomeChangePercent) >= 0 ? 'increased' : 'decreased'} by{' '}
                <strong style={{ color: parseFloat(incomeChangePercent) >= 0 ? '#10b981' : '#f43f5e' }}>
                  {Math.abs(incomeChangePercent)}%
                </strong>{' '}
                this month.
              </p>
            </div>

            {/* Savings Tip */}
            <div
              style={{
                padding: '16px',
                borderRadius: 14,
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Target size={14} style={{ color: 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Savings Summary
                </span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                You're saving <strong style={{ color: '#3b82f6' }}>{savingsRate}%</strong> of your income.
                {parseFloat(savingsRate) >= 20
                  ? ' Excellent! You\'re above the recommended 20% savings rate.'
                  : parseFloat(savingsRate) >= 10
                  ? ' Good progress! Try to reach the 20% savings target.'
                  : ' Consider cutting expenses to improve your savings rate.'}
              </p>
            </div>

            {/* Highest spending alert */}
            {highestCategory && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: 14,
                  background: 'rgba(249, 115, 22, 0.06)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Zap size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Spending Alert
                  </span>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  <strong>{CATEGORY_ICONS[highestCategory[0]]} {highestCategory[0]}</strong> is your biggest expense at{' '}
                  <strong style={{ color: '#f97316' }}>{formatCurrency(highestCategory[1])}</strong>.
                  {highestCategory[0] === 'Rent'
                    ? ' Housing is typically the largest expense. Consider if there are ways to reduce utility costs.'
                    : ` Review your ${highestCategory[0].toLowerCase()} spending for potential savings.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
