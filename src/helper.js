import { CATEGORIES } from './constants'

export const getId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

export const getDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const processedDataForChart = (expenses) => {
    if(!Array.isArray(expenses) || expenses.length === 0) return [];

    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);

    if (totalSpending === 0) return [];

    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

   const pieChartData = Object.keys(spendingByCategory).map((categoryName) => {
    const amount = spendingByCategory[categoryName];
    const percentage = Math.round((amount / totalSpending) * 100);
    const categoryInfo = CATEGORIES.find(category => category.name === categoryName);
    return {
        name: categoryName,
        amount,
        value: percentage,
        color: categoryInfo?.color || '#808080',
        icon: categoryInfo?.icon,
        text: `${percentage}%`,
    }
   })
   pieChartData.sort((a, b) => b.amount - a.amount);
   return pieChartData;
}