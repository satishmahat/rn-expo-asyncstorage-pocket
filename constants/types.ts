// Category Types
export interface Category {
  name: string
  icon: string
  color: string
}

// Expense Types
export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  color: string
  icon: string
}

// Expense Input (for creating new expenses)
export interface ExpenseInput {
  title: string
  amount: number
  category: Category
  date: string // Required - date must be provided when creating expense
}

// Chart/Statistics Types
export interface PieChartData {
  name: string
  amount: number
  value: number
  color: string
  icon?: string
  text: string
}

// Component Props Types
export interface CategoryCardProps {
  item: PieChartData
  onPress: () => void
}

export interface EmptyListProps {
  title?: string
  message?: string
}

export interface ExpenseItemCardProps {
  item: Expense
}

// Context Types
export interface ExpenseContextType {
  expenses: Expense[]
  addExpense: (expense: ExpenseInput) => void
  deleteExpense: (id: string) => void
  hasCompletedOnboarding: boolean | null
  userName: string
  completeOnboarding: (name: string) => Promise<void>
  isLoading: boolean
}

