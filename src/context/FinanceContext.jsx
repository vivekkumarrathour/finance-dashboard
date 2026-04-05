import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { initialTransactions } from '../data/mockData';

// ─── Action Types ────────────────────────────────────────────────
const ACTIONS = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  SET_ROLE: 'SET_ROLE',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
};

// ─── Initial State ───────────────────────────────────────────────
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('financeflow-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        transactions: parsed.transactions || initialTransactions,
        filter: 'all',
        search: '',
        sort: { field: 'date', direction: 'desc' },
        role: parsed.role || 'admin',
        darkMode: parsed.darkMode ?? false,
        activeTab: 'dashboard',
      };
    }
  } catch (e) {
    console.warn('Failed to load saved state:', e);
  }

  return {
    transactions: initialTransactions,
    filter: 'all',
    search: '',
    sort: { field: 'date', direction: 'desc' },
    role: 'admin',
    darkMode: false,
    activeTab: 'dashboard',
  };
};

// ─── Reducer ─────────────────────────────────────────────────────
function financeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };

    case ACTIONS.ADD_TRANSACTION:
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case ACTIONS.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };

    case ACTIONS.SET_SORT:
      return { ...state, sort: action.payload };

    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };

    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };

    case ACTIONS.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────
const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, null, getInitialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'financeflow-state',
        JSON.stringify({
          transactions: state.transactions,
          role: state.role,
          darkMode: state.darkMode,
        })
      );
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state.transactions, state.role, state.darkMode]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  // ─── Computed Values ─────────────────────────────────────────
  const totalIncome = state.transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Filtered & sorted transactions
  const filteredTransactions = state.transactions
    .filter((t) => {
      if (state.filter !== 'all' && t.type !== state.filter) return false;
      if (state.search) {
        const query = state.search.toLowerCase();
        return (
          t.category.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.amount.toString().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const { field, direction } = state.sort;
      let comparison = 0;

      if (field === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (field === 'amount') {
        comparison = a.amount - b.amount;
      } else if (field === 'category') {
        comparison = a.category.localeCompare(b.category);
      }

      return direction === 'asc' ? comparison : -comparison;
    });

  // Category breakdown for expenses
  const categoryBreakdown = state.transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // ─── Action Dispatchers ──────────────────────────────────────
  const addTransaction = (transaction) => {
    dispatch({
      type: ACTIONS.ADD_TRANSACTION,
      payload: {
        ...transaction,
        id: Math.random().toString(36).substring(2, 11),
      },
    });
  };

  const updateTransaction = (transaction) => {
    dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setSearch = (search) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: search });
  };

  const setSort = (sort) => {
    dispatch({ type: ACTIONS.SET_SORT, payload: sort });
  };

  const setRole = (role) => {
    dispatch({ type: ACTIONS.SET_ROLE, payload: role });
  };

  const toggleDarkMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
  };

  const setActiveTab = (tab) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab });
  };

  const exportData = (format = 'json') => {
    const data = state.transactions;
    let content, filename, mimeType;

    if (format === 'csv') {
      const headers = 'Date,Amount,Category,Type,Description\n';
      const rows = data
        .map((t) => `${t.date},${t.amount},${t.category},${t.type},"${t.description}"`)
        .join('\n');
      content = headers + rows;
      filename = 'transactions.csv';
      mimeType = 'text/csv';
    } else {
      content = JSON.stringify(data, null, 2);
      filename = 'transactions.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const value = {
    ...state,
    totalIncome,
    totalExpenses,
    totalBalance,
    filteredTransactions,
    categoryBreakdown,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setFilter,
    setSearch,
    setSort,
    setRole,
    toggleDarkMode,
    setActiveTab,
    exportData,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

export default FinanceContext;
