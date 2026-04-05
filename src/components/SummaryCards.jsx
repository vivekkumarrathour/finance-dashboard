import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useFinance();

  // Calculate month-over-month change
  const currentMonth = new Date().toISOString().slice(0, 7);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);

  const currentMonthIncome = transactions
    .filter((t) => t.date.startsWith(currentMonth) && t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const lastMonthIncome = transactions
    .filter((t) => t.date.startsWith(lastMonth) && t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const currentMonthExpenses = transactions
    .filter((t) => t.date.startsWith(currentMonth) && t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);
  const lastMonthExpenses = transactions
    .filter((t) => t.date.startsWith(lastMonth) && t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);

  const incomeChange = lastMonthIncome > 0
    ? (((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100).toFixed(1)
    : 0;
  const expenseChange = lastMonthExpenses > 0
    ? (((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(1)
    : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: Wallet,
      gradient: 'gradient-blue',
      iconBg: 'rgba(255,255,255,0.2)',
      change: null,
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      gradient: 'gradient-emerald',
      iconBg: 'rgba(255,255,255,0.2)',
      change: incomeChange,
      changeLabel: 'vs last month',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      gradient: 'gradient-rose',
      iconBg: 'rgba(255,255,255,0.2)',
      change: expenseChange,
      changeLabel: 'vs last month',
      invertChange: true,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.invertChange
          ? parseFloat(card.change) < 0
          : parseFloat(card.change) > 0;

        return (
          <div
            key={card.title}
            className={`${card.gradient} animate-slide-up stagger-${index + 1}`}
            style={{
              borderRadius: 20,
              padding: '28px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -20,
                right: 40,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 500, opacity: 0.85, marginBottom: '8px' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {formatCurrency(card.amount)}
                </p>
                {card.change !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', fontSize: '0.8rem', opacity: 0.85 }}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span style={{ fontWeight: 600 }}>
                      {Math.abs(card.change)}%
                    </span>
                    <span>{card.changeLabel}</span>
                  </div>
                )}
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
