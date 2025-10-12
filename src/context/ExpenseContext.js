import { createContext, useContext, useState, useEffect } from "react";
import { getId, getDate } from "../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Get data from async storage
    useEffect(() => {
        const getData = async () => {
            try {
                const storedExpenses =await AsyncStorage.getItem('expensesList');
                if(storedExpenses!==null) {
                    setExpenses(JSON.parse(storedExpenses));
                }
            }catch(error) {
                console.error("Failed to load expenses from storage", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    //Save data to async storage
    useEffect(() => {
        if(!isLoading){ 
        const saveExpenses = async () => {
            try {
                await AsyncStorage.setItem('expensesList', JSON.stringify(expenses));
            } catch (error) {
                console.error("Failed to save expenses to storage", error);
            }
        }
        saveExpenses();
        }
    }, [expenses]);


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

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    }
    return (
        <ExpenseContext.Provider value={{expenses, addExpense, deleteExpense}}>{children}</ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);

