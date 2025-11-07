import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Expense, ExpenseContextType, ExpenseInput } from "../constants/types";
import { getId } from "../lib/helper";

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
    const [userName, setUserName] = useState<string>('');

    //Get data from async storage
    useEffect(() => {
        const getData = async () => {
            try {
                const storedExpenses = await AsyncStorage.getItem('expensesList');
                if(storedExpenses !== null) {
                    setExpenses(JSON.parse(storedExpenses) as Expense[]);
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
            } catch(error) {
                console.error("Failed to load data from storage", error);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    //Save data to async storage
    useEffect(() => {
        if(!isLoading) { 
            const saveExpenses = async () => {
                try {
                    await AsyncStorage.setItem('expensesList', JSON.stringify(expenses));
                } catch (error) {
                    console.error("Failed to save expenses to storage", error);
                }
            };
            saveExpenses();
        }
    }, [expenses, isLoading]);

    const addExpense = (expense: ExpenseInput): void => {
        const newExpense: Expense = {
            id: getId(),
            title: expense.title,
            amount: Number(expense.amount),
            category: expense.category.name,
            date: expense.date, // Date is required and must be provided
            color: expense.category.color,
            icon: expense.category.icon
        };
        setExpenses([...expenses, newExpense]);
    };

    const deleteExpense = (id: string): void => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };
    
    const completeOnboarding = async (name: string): Promise<void> => {
        try {
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
            await AsyncStorage.setItem('userName', name);
            setHasCompletedOnboarding(true);
            setUserName(name);
        } catch (error) {
            console.error("Failed to save onboarding data", error);
        }
    };
    
    // Sort expenses by date in descending order (most recent first)
    const sortedExpenses = [...expenses].sort((a, b) => {
        // Compare dates (YYYY-MM-DD format is sortable as strings)
        // Most recent dates come first (descending order)
        return b.date.localeCompare(a.date);
    });
    
    const contextValue: ExpenseContextType = {
        expenses: sortedExpenses, 
        addExpense, 
        deleteExpense,
        hasCompletedOnboarding,
        userName,
        completeOnboarding,
        isLoading
    };
    
    return (
        <ExpenseContext.Provider value={contextValue}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = (): ExpenseContextType => {
    const context = useContext(ExpenseContext);
    if (context === undefined) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
};

