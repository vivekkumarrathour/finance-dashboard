// Mock transaction data for the finance dashboard
const generateId = () => Math.random().toString(36).substring(2, 11);

export const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Travel',
  'Education',
  'Rent',
  'Gifts',
  'Other',
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gifts', 'Other'];
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Travel',
  'Education',
  'Rent',
  'Other',
];

export const CATEGORY_COLORS = {
  'Salary': '#3b82f6',
  'Freelance': '#8b5cf6',
  'Investment': '#06b6d4',
  'Food & Dining': '#f97316',
  'Transportation': '#eab308',
  'Shopping': '#ec4899',
  'Entertainment': '#a855f7',
  'Healthcare': '#ef4444',
  'Utilities': '#64748b',
  'Travel': '#14b8a6',
  'Education': '#6366f1',
  'Rent': '#f43f5e',
  'Gifts': '#10b981',
  'Other': '#94a3b8',
};

export const CATEGORY_ICONS = {
  'Salary': '💰',
  'Freelance': '💻',
  'Investment': '📈',
  'Food & Dining': '🍽️',
  'Transportation': '🚗',
  'Shopping': '🛍️',
  'Entertainment': '🎬',
  'Healthcare': '🏥',
  'Utilities': '⚡',
  'Travel': '✈️',
  'Education': '📚',
  'Rent': '🏠',
  'Gifts': '🎁',
  'Other': '📋',
};

export const initialTransactions = [
  // January 2026
  { id: generateId(), date: '2026-01-05', amount: 5200, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: generateId(), date: '2026-01-08', amount: 850, category: 'Freelance', type: 'income', description: 'Web design project' },
  { id: generateId(), date: '2026-01-03', amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
  { id: generateId(), date: '2026-01-10', amount: 320, category: 'Food & Dining', type: 'expense', description: 'Weekly groceries & dining' },
  { id: generateId(), date: '2026-01-12', amount: 150, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: generateId(), date: '2026-01-15', amount: 80, category: 'Transportation', type: 'expense', description: 'Gas refill' },
  { id: generateId(), date: '2026-01-18', amount: 200, category: 'Shopping', type: 'expense', description: 'New sneakers' },
  { id: generateId(), date: '2026-01-22', amount: 45, category: 'Entertainment', type: 'expense', description: 'Movie tickets & snacks' },
  { id: generateId(), date: '2026-01-25', amount: 400, category: 'Investment', type: 'income', description: 'Dividend payout' },

  // February 2026
  { id: generateId(), date: '2026-02-05', amount: 5200, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: generateId(), date: '2026-02-10', amount: 1200, category: 'Freelance', type: 'income', description: 'Mobile app UI project' },
  { id: generateId(), date: '2026-02-03', amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
  { id: generateId(), date: '2026-02-08', amount: 380, category: 'Food & Dining', type: 'expense', description: 'Groceries & restaurants' },
  { id: generateId(), date: '2026-02-12', amount: 130, category: 'Utilities', type: 'expense', description: 'Water & internet' },
  { id: generateId(), date: '2026-02-14', amount: 250, category: 'Gifts', type: 'expense', description: "Valentine's Day gifts" },
  { id: generateId(), date: '2026-02-18', amount: 95, category: 'Healthcare', type: 'expense', description: 'Doctor visit copay' },
  { id: generateId(), date: '2026-02-22', amount: 1500, category: 'Travel', type: 'expense', description: 'Weekend ski trip' },
  { id: generateId(), date: '2026-02-28', amount: 300, category: 'Education', type: 'expense', description: 'Online course subscription' },

  // March 2026
  { id: generateId(), date: '2026-03-05', amount: 5400, category: 'Salary', type: 'income', description: 'Monthly salary (with bonus)' },
  { id: generateId(), date: '2026-03-12', amount: 600, category: 'Investment', type: 'income', description: 'Stock gains realized' },
  { id: generateId(), date: '2026-03-15', amount: 500, category: 'Gifts', type: 'income', description: 'Birthday money' },
  { id: generateId(), date: '2026-03-03', amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
  { id: generateId(), date: '2026-03-07', amount: 410, category: 'Food & Dining', type: 'expense', description: 'Groceries & takeout' },
  { id: generateId(), date: '2026-03-10', amount: 160, category: 'Utilities', type: 'expense', description: 'Electric & gas bill' },
  { id: generateId(), date: '2026-03-14', amount: 350, category: 'Shopping', type: 'expense', description: 'Spring wardrobe refresh' },
  { id: generateId(), date: '2026-03-20', amount: 120, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: generateId(), date: '2026-03-25', amount: 75, category: 'Transportation', type: 'expense', description: 'Uber rides' },
  { id: generateId(), date: '2026-03-28', amount: 200, category: 'Healthcare', type: 'expense', description: 'Dental cleaning' },

  // April 2026
  { id: generateId(), date: '2026-04-01', amount: 5200, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: generateId(), date: '2026-04-03', amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
  { id: generateId(), date: '2026-04-05', amount: 290, category: 'Food & Dining', type: 'expense', description: 'Weekly groceries' },
];

// Monthly summary data for charts
export const monthlyData = [
  { month: 'Oct', monthFull: 'October 2025', income: 4800, expenses: 3200, balance: 1600 },
  { month: 'Nov', monthFull: 'November 2025', income: 5100, expenses: 3800, balance: 1300 },
  { month: 'Dec', monthFull: 'December 2025', income: 5800, expenses: 4500, balance: 1300 },
  { month: 'Jan', monthFull: 'January 2026', income: 6450, expenses: 1995, balance: 4455 },
  { month: 'Feb', monthFull: 'February 2026', income: 6400, expenses: 3755, balance: 2645 },
  { month: 'Mar', monthFull: 'March 2026', income: 6500, expenses: 2515, balance: 3985 },
  { month: 'Apr', monthFull: 'April 2026', income: 5200, expenses: 1490, balance: 3710 },
];
