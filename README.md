# FinanceFlow — Personal Finance Dashboard

A clean, responsive, and feature-rich frontend finance dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Tech Stack](https://img.shields.io/badge/TailwindCSS-4-teal?logo=tailwindcss)
![Tech Stack](https://img.shields.io/badge/Recharts-2-orange)

---

## 📋 Project Overview

FinanceFlow is a personal finance dashboard that helps users track and understand their financial activity through visual summaries, transaction management, and smart insights — all powered by mock/static data with localStorage persistence.

## ✨ Features

### 🏠 Dashboard Overview
- **Summary Cards** — Total Balance, Income, and Expenses with month-over-month change indicators
- **Balance Trend Chart** — Area chart showing Income vs Expenses vs Balance over 7 months
- **Spending Breakdown** — Donut chart with categorical expense breakdown and ranked list

### 💳 Transaction Management
- Full transaction table with Date, Amount, Category, Type, and Description
- **Search** — Filter by category, description, or amount
- **Filter** — Toggle between All / Income / Expense
- **Sort** — Click column headers to sort by date, amount, or category
- **Export** — Download transactions as CSV or JSON
- Responsive mobile card layout

### 🛡️ Role-Based UI (Frontend Simulation)
- **Admin** — Can add, edit, and delete transactions
- **Viewer** — Read-only mode, action buttons hidden
- Role toggle in the header with visual distinction

### 📊 Insights
- Highest & lowest spending categories
- Monthly expense & income comparison with percentage change
- Savings rate calculation with contextual tips
- Top spending categories horizontal bar chart
- Financial observations with dynamic insights

### 🎨 UI/UX
- **Dark Mode** toggle with smooth transitions
- **Glassmorphism** card effects with backdrop blur
- **Gradient** summary cards with decorative backgrounds
- **Micro-animations** — fade-in, slide-up, scale transitions
- Fully responsive (mobile + desktop)
- Empty state handling
- Custom scrollbar styling

### 💾 Persistence
- Transactions, role selection, and dark mode preference saved to `localStorage`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Recharts** | Charts (Area, Pie, Bar) |
| **Lucide React** | Icon library |
| **Context API + useReducer** | State management |
| **localStorage** | Data persistence |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation, role toggle, dark mode
│   ├── SummaryCards.jsx     # Balance, Income, Expense cards
│   ├── BalanceChart.jsx     # Area chart (income vs expenses trend)
│   ├── CategoryChart.jsx    # Donut chart (spending breakdown)
│   ├── TransactionList.jsx  # Transaction table with search/filter/sort
│   ├── TransactionModal.jsx # Add/Edit transaction form
│   └── Insights.jsx         # Financial insights & observations
├── context/
│   └── FinanceContext.jsx   # Global state management
├── data/
│   └── mockData.js          # Mock transactions & categories
├── App.jsx                  # Main app with tab routing
├── main.jsx                 # Entry point
└── index.css                # Design system & global styles
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 Code Quality

- ✅ Modular component architecture
- ✅ Reusable design tokens & CSS utilities
- ✅ Clean state management with Context API + useReducer
- ✅ Separation of concerns (data, context, components)
- ✅ Responsive design from mobile-first approach
- ✅ Accessible interactive elements
- ✅ No external backend dependencies

---

## 📝 License

MIT
