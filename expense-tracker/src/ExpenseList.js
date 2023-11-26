import React from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses, onDeleteExpense, onEditExpense, selectedCurrency }) {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.title} - {selectedCurrency} {expense.amount.toFixed(2)}</span>
            <div>
              <button onClick={() => onEditExpense(expense.id)}>Edit</button>
              <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
