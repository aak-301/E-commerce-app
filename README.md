# Mini E-commerce App

A React Native mobile application that provides a streamlined e-commerce experience with product browsing, detailed product views, and shopping cart functionality.

## How to download release build to test

MiniEcommerceApp/android/app/build/outputs/bundle/release/app-release.aab

## Features

- **Product List**: Grid display of products with images, titles, prices, and ratings
- **Product Details**: Detailed view with full product information and rating
- **Shopping Cart**: Add, remove, and adjust quantities of products
- **Persistent Storage**: Cart data persists across app restarts
- **Error Handling**: Comprehensive error handling with informative user feedback

## Technologies Used

- **React Native**: For cross-platform mobile app development
- **TypeScript**: For type-safe code
- **Context API**: For global state management
- **Axios**: For API requests
- **React Navigation**: For screen navigation
- **AsyncStorage**: For local data persistence
- **React Native Safe Area Context**: For handling safe areas on different devices

## Project Structure

```
MiniEcommerceApp/
├── src/
│   ├── api/
│   │   ├── apiClient.ts       # Axios configuration and interceptors
│   │   └── productsApi.ts     # Product-related API calls
│   ├── components/
│   │   ├── CartItem.tsx       # Cart item component
│   │   ├── ProductCard.tsx    # Product card component for grid
│   │   ├── LoadingIndicator.tsx # Loading spinner component
│   │   ├── ErrorComponent.tsx # Error display component
│   │   └── SnackBar.tsx       # Notification component
│   ├── context/
│   │   ├── CartContext.tsx    # Cart state management
│   │   └── SnackbarContext.tsx # Notification state management
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation configuration
│   ├── screens/
│   │   ├── ProductListScreen.tsx # Main product grid screen
│   │   ├── ProductDetailScreen.tsx # Detailed product view
│   │   └── CartScreen.tsx     # Shopping cart screen
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── asyncStorage.ts    # AsyncStorage helper functions
│   │   └── formatCurrency.ts  # Currency formatting utilities
│   └── App.tsx                # Main application component
├── index.js                   # Entry point
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native CLI
- Android Studio and/or Xcode (for iOS)
- Android SDK or iOS development environment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MiniEcommerceApp.git
   cd MiniEcommerceApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS dependencies (for macOS users):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Development Server

```bash
npm start
```

## Key Implementation Details

### API Integration
- The app uses the [Fake Store API](https://fakestoreapi.com/products) for product data
- Axios interceptors handle request/response formatting and error handling

### State Management
- Context API manages global state for cart and notifications
- Reducer pattern for complex state logic in CartContext

### Navigation
- Stack navigator for smooth transitions between screens
- Cart badge in header shows current number of items

### Offline Support
- Cart data persists using AsyncStorage
- Error handling for network issues

### UI/UX Features
- Pull-to-refresh on product list
- Safe area handling for different device types
- Animated notifications for user feedback
- Loading indicators during data fetching


