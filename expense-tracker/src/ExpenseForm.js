import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ onAddOrEditExpense, editingExpense, onCancelEdit, selectedCurrency }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // useEffect to update form fields when editing an expense
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount) {
      const expense = {
        id: editingExpense ? editingExpense.id : new Date().getTime().toString(),
        title,
        amount: +amount,
        currency: selectedCurrency,
      };
      onAddOrEditExpense(expense);
      setTitle('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <div>
        <button type="submit">{editingExpense ? 'Save Changes' : 'Add Expense'}</button>
        {editingExpense && <button type="button" onClick={onCancelEdit}>Cancel Edit</button>}
      </div>
    </form>
  );
}

export default ExpenseForm;
