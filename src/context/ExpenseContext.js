import { createContext, useContext, useState, useEffect } from "react";
import { getId, getDate } from "../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);
    const [userName, setUserName] = useState('');

    //Get data from async storage
    useEffect(() => {
        const getData = async () => {
            try {
                const storedExpenses = await AsyncStorage.getItem('expensesList');
                if(storedExpenses!==null) {
                    setExpenses(JSON.parse(storedExpenses));
                }
                
                // Get onboarding status
                const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
                const storedName = await AsyncStorage.getItem('userName');
                
                if(onboardingStatus === 'true') {
                    setHasCompletedOnboarding(true);
                } else {
                    setHasCompletedOnboarding(false);
                }
                
                if(storedName) {
                    setUserName(storedName);
                }
            }catch(error) {
                console.error("Failed to load data from storage", error);
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
    
    const completeOnboarding = async (name) => {
        try {
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
            await AsyncStorage.setItem('userName', name);
            setHasCompletedOnboarding(true);
            setUserName(name);
        } catch (error) {
            console.error("Failed to save onboarding data", error);
        }
    }
    
    // Sort expenses by amount in descending order (highest first)
    const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
    
    return (
        <ExpenseContext.Provider value={{
            expenses: sortedExpenses, 
            addExpense, 
            deleteExpense,
            hasCompletedOnboarding,
            userName,
            completeOnboarding,
            isLoading
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);

