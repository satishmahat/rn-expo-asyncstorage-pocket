import { CATEGORIES } from '../constants/category'
import type { Expense, PieChartData } from '../constants/types'

export type Timeframe = 'week' | 'month' | '3months' | '6months' | 'year' | 'all'

export interface BarChartData {
    value: number
    label: string
    frontColor: string
    spacing?: number
}

export interface Statistics {
    totalSpending: number
    averagePerDay: number
    averagePerWeek: number
    averagePerMonth: number
    topCategory: { name: string; amount: number; icon?: string; color: string } | null
    totalTransactions: number
}

export const getId = (): string => {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
}

// Format date to YYYY-MM-DD in local timezone (not UTC)
export const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Filter expenses by timeframe
export const filterExpensesByTimeframe = (expenses: Expense[], timeframe: Timeframe): Expense[] => {
    if (timeframe === 'all') return expenses

    const now = new Date()
    const today = formatDateToYYYYMMDD(now)
    let cutoffDate: string

    switch (timeframe) {
        case 'week':
            const weekAgo = new Date(now)
            weekAgo.setDate(weekAgo.getDate() - 7)
            cutoffDate = formatDateToYYYYMMDD(weekAgo)
            break
        case 'month':
            const monthAgo = new Date(now)
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            cutoffDate = formatDateToYYYYMMDD(monthAgo)
            break
        case '3months':
            const threeMonthsAgo = new Date(now)
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
            cutoffDate = formatDateToYYYYMMDD(threeMonthsAgo)
            break
        case '6months':
            const sixMonthsAgo = new Date(now)
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
            cutoffDate = formatDateToYYYYMMDD(sixMonthsAgo)
            break
        case 'year':
            const yearAgo = new Date(now)
            yearAgo.setFullYear(yearAgo.getFullYear() - 1)
            cutoffDate = formatDateToYYYYMMDD(yearAgo)
            break
        default:
            return expenses
    }

    return expenses.filter(expense => expense.date >= cutoffDate && expense.date <= today)
}

// Process data for bar chart by category
export const processedDataForBarChart = (expenses: Expense[]): BarChartData[] => {
    if (!Array.isArray(expenses) || expenses.length === 0) return []

    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
    }, {} as Record<string, number>)

    const barChartData = Object.keys(spendingByCategory)
        .map((categoryName) => {
            const amount = spendingByCategory[categoryName]
            const categoryInfo = CATEGORIES.find(category => category.name === categoryName)

            // Truncate to 5-6 characters with ellipsis
            const truncatedLabel = categoryName.length > 6 
                ? categoryName.substring(0, 6) + '...' 
                : categoryName

            return {
                value: amount,
                label: truncatedLabel,
                frontColor: categoryInfo?.color || '#808080',
                spacing: 2,
            }
        })
        .sort((a, b) => b.value - a.value) // Sort by amount descending
        .slice(0, 8) // Limit to top 8 categories for better visualization

    return barChartData
}

// Calculate statistics for expenses
export const calculateStatistics = (expenses: Expense[]): Statistics => {
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return {
            totalSpending: 0,
            averagePerDay: 0,
            averagePerWeek: 0,
            averagePerMonth: 0,
            topCategory: null,
            totalTransactions: 0,
        }
    }

    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0)
    const totalTransactions = expenses.length

    // Calculate date range
    const dates = expenses.map(exp => exp.date).sort()
    const firstDate = new Date(dates[0])
    const lastDate = new Date(dates[dates.length - 1])
    const daysDiff = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    const weeksDiff = Math.max(1, Math.ceil(daysDiff / 7))
    const monthsDiff = Math.max(1, Math.ceil(daysDiff / 30))

    // Calculate averages
    const averagePerDay = totalSpending / daysDiff
    const averagePerWeek = totalSpending / weeksDiff
    const averagePerMonth = totalSpending / monthsDiff

    // Find top category
    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
    }, {} as Record<string, number>)

    let topCategory: Statistics['topCategory'] = null
    let maxAmount = 0

    Object.keys(spendingByCategory).forEach((categoryName) => {
        const amount = spendingByCategory[categoryName]
        if (amount > maxAmount) {
            maxAmount = amount
            const categoryInfo = CATEGORIES.find(cat => cat.name === categoryName)
            topCategory = {
                name: categoryName,
                amount,
                icon: categoryInfo?.icon,
                color: categoryInfo?.color || '#808080',
            }
        }
    })

    return {
        totalSpending,
        averagePerDay,
        averagePerWeek,
        averagePerMonth,
        topCategory,
        totalTransactions,
    }
}

export const processedDataForChart = (expenses: Expense[]): PieChartData[] => {
    if (!Array.isArray(expenses) || expenses.length === 0) return []

    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0)

    if (totalSpending === 0) return []

    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
    }, {} as Record<string, number>)

    const pieChartData = Object.keys(spendingByCategory).map((categoryName) => {
        const amount = spendingByCategory[categoryName]
        const percentage = Math.round((amount / totalSpending) * 100)
        const categoryInfo = CATEGORIES.find(category => category.name === categoryName)

        return {
            name: categoryName,
            amount,
            value: percentage,
            color: categoryInfo?.color || '#808080',
            icon: categoryInfo?.icon,
            text: `${percentage}%`,
        }
    })

    pieChartData.sort((a, b) => b.amount - a.amount)

    return pieChartData
}

