import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Modal from './Modal';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [expenseTitleMap, setExpenseTitleMap] = useState({});
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const addOrEditExpense = (expense) => {
    if (editingExpense) {
      // Updating existing expense
      const updatedExpenses = expenses.map((item) =>
        item.id === editingExpense.id ? { ...item, ...expense } : item
      );
      setExpenses(updatedExpenses);
    } else {
      // Adding a new expense
      setExpenses([...expenses, expense]);
    }

    // Update the map
    if (expenseTitleMap[expense.title]) {
      // If title exists, append the expense
      expenseTitleMap[expense.title].push(expense);
    } else {
      // If title doesn't exist, create a new entry
      expenseTitleMap[expense.title] = [expense];
    }

    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    const deletedExpense = expenses.find((expense) => expense.id === id);
    
    // Update the map
    const updatedTitleMap = { ...expenseTitleMap };
    if (deletedExpense && deletedExpense.title && updatedTitleMap[deletedExpense.title]) {
      // Remove the expense from the map
      updatedTitleMap[deletedExpense.title] = updatedTitleMap[deletedExpense.title].filter(
        (expenseItem) => expenseItem.id !== id
      );

      // If no more expenses for a title, remove the title from the map
      if (updatedTitleMap[deletedExpense.title].length === 0) {
        delete updatedTitleMap[deletedExpense.title];
      }
    }

    setExpenses(expenses.filter((expense) => expense.id !== id));
    setExpenseTitleMap(updatedTitleMap);
  };

  const calculateTotalExpense = () => {
    const total = expenses.reduce(
      (sum, expense) => sum + convertToSelectedCurrency(expense.amount, expense.currency),
      0
    );
    setTotalExpense(total);
  };

  useEffect(() => {
    calculateTotalExpense();
  }, [expenses, selectedCurrency]);

  const editExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setEditingExpense(expenseToEdit);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  const convertToSelectedCurrency = (amount, fromCurrency) => {
    // Placeholder conversion logic
    return amount * (fromCurrency === 'USD' ? 1 : 1);
  };

  const showCategoryExpensesDialog = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAddOrEditExpense={addOrEditExpense}
        editingExpense={editingExpense}
        onCancelEdit={cancelEdit}
        selectedCurrency={selectedCurrency}
      />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={editExpense}
        selectedCurrency={selectedCurrency}
      />
      <div className="total-expense">Total Expense: {selectedCurrency} {totalExpense.toFixed(2)}</div>
      <div className="currency-selector">
        <label>
          Select Currency:
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
            {['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={showCategoryExpensesDialog}>Show Category-wise Expenses</button>
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        categoryExpensesMap={expenseTitleMap}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
}

export default App;
