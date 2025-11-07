# 💰 Expense Tracker - React Native App

A beautiful and intuitive expense tracking mobile application built with React Native and Expo. Track your spending, categorize expenses, and gain insights into your financial habits.

## ✨ Features

### 📱 Core Functionality
- **Add Expenses**: Create new expenses with amount, title, category, and date
- **View Transactions**: Browse all your expenses in a clean, organized list
- **Swipe Actions**: Swipe left to edit or right to delete expenses
- **Category Management**: 16 predefined categories with custom icons and colors
- **Date Selection**: Choose any past date for your expenses with native date pickers
- **Spending Insights**: Visual pie charts showing spending breakdown by category

### 🎨 User Experience
- **Onboarding Flow**: Personalized welcome experience with name input
- **Custom Tab Bar**: Beautiful gradient tab bar with smooth animations
- **Responsive Design**: Optimized for all screen sizes with safe area handling
- **Empty States**: Helpful messages when no data is available
- **Real-time Updates**: Instant UI updates when expenses are added or deleted

### 📊 Analytics & Insights
- **Spending Summary**: Total amount spent displayed prominently
- **Category Breakdown**: Visual representation of spending by category
- **Percentage Display**: See what percentage each category represents
- **Interactive Charts**: Tap on chart segments for better visualization

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5 with Expo ~54.0.22
- **Language**: TypeScript 5.9.2
- **Navigation**: Expo Router 6.0.14 (file-based routing)
- **Styling**: NativeWind v4.2.1 (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistent data
- **Charts**: react-native-gifted-charts 1.4.64
- **Icons**: @expo/vector-icons
- **Date Picker**: @react-native-community/datetimepicker
- **Animations**: react-native-reanimated, react-native-gesture-handler

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-rn-expo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on your physical device

## 🏗️ Project Structure

```
expense-tracker-rn-expo/
├── app/                      # Expo Router file-based routing
│   ├── (onboarding)/        # Onboarding screens
│   │   ├── index.tsx        # Welcome screen
│   │   └── name-input.tsx   # Name input screen
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Home screen
│   │   ├── transactions.tsx # Transactions list
│   │   ├── create.tsx       # Create expense screen
│   │   ├── insights.tsx     # Spending insights
│   │   └── _layout.tsx      # Tab bar configuration
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── CategoryCard.tsx    # Category display card
│   ├── ExpenseItemCard.tsx # Expense item with swipe actions
│   ├── EmptyList.tsx       # Empty state component
│   └── SafeScreen.tsx      # Safe area wrapper
├── constants/               # Constants and types
│   ├── category.ts         # Category definitions
│   └── types.ts            # TypeScript interfaces
├── context/                # Context providers
│   └── ExpenseContext.tsx  # Expense state management
└── lib/                    # Utility functions
    └── helper.ts           # Helper functions (date formatting, etc.)
```

## 🎯 Key Features Explained

### Onboarding
- First-time users are greeted with a welcome screen
- Name input personalizes the experience
- Onboarding status is saved and remembered

### Home Screen
- Personalized greeting with user's name
- Total spending display
- Category-wise expense breakdown with visual cards

### Create Expense
- Form with amount, title, date, and category inputs
- Native date pickers (platform-specific)
- Category selection modal with 16 categories
- Validation and error handling

### Transactions
- List of all expenses sorted by date (most recent first)
- Swipeable cards with delete functionality
- Empty state when no transactions exist

### Insights
- Interactive donut chart showing spending distribution
- Category breakdown list with amounts and percentages
- Total spending displayed in chart center

## 🎨 Design Features

- **Custom Fonts**: Syne font family (Regular, Medium, SemiBold, Bold, ExtraBold)
- **Color Scheme**: Modern color palette with category-specific colors
- **Gradients**: Linear gradients for visual appeal
- **Shadows**: Subtle shadows for depth
- **Animations**: Smooth transitions and press animations

## 📱 Screens

1. **Welcome Screen**: Beautiful onboarding with app branding
2. **Name Input**: Personalized setup
3. **Home**: Dashboard with spending overview
4. **Transactions**: Complete expense history
5. **Create**: Add new expenses
6. **Insights**: Spending analytics and charts

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

### Code Style

- TypeScript for type safety
- NativeWind v4 for styling (Tailwind CSS)
- Functional components with hooks
- Context API for state management

## 📝 Data Storage

- Expenses are stored locally using AsyncStorage
- Data persists across app restarts
- Onboarding status and user name are saved
- No backend required - fully offline capable

## 🚀 Future Enhancements

Potential features for future versions:
- Edit expense functionality
- Filter and search expenses
- Export data to CSV/PDF
- Budget setting and tracking
- Monthly/yearly reports
- Multiple currency support
- Dark mode
- Cloud sync

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with ❤️ using React Native and Expo.

---

**Note**: This app requires Expo Go or a development build to run. For production, create a standalone build using `eas build`.
