import { createContext, useContext, useState } from "react";
import { getId, getDate } from "../helper";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);

    const addExpense = (expense) => {
        const newExpense = {
            id: getId(),
            title: expense.title,
            amount: Number(expense.amount),
            category: expense.category.name,
            date: getDate(),
            color: expense.category.color,
            icon: expense.category.icon
        }
        setExpenses([...expenses, newExpense]);
    }
    return (
        <ExpenseContext.Provider value={{expenses, addExpense}}>{children}</ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);

