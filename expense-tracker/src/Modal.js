// Modal.js

import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, categoryExpensesMap, selectedCurrency }) {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Category-wise Expenses</h2>
          <ul>
            {Object.entries(categoryExpensesMap).map(([title, expenses]) => (
              <li key={title}>
                <p>{title}: {selectedCurrency} {expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
}

export default Modal;
