import { CATEGORIES } from '../constants/category'
import type { Expense, PieChartData } from '../constants/types'

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

