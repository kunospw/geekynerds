# GeekyNerds 📚

A modern, responsive e-commerce platform for tech books and programming resources. Built with React, featuring a clean UI, shopping cart functionality, and mobile-optimized design.

## ✨ Features

- **Product Catalog**: Browse and search through a comprehensive collection of tech books
- **Shopping Cart**: Add/remove items with persistent localStorage-based cart
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Real-time Search**: Dynamic search functionality with URL-based state management
- **Category Filtering**: Filter books by programming languages and tech topics
- **Modern UI**: Glass morphism effects, smooth animations, and gradient accents
- **Toast Notifications**: Enhanced user-friendly feedback with smooth animations
- **Skeleton Loading**: Elegant loading states while fetching data
- **Mobile-Optimized**: Touch-friendly controls and responsive layouts
- **Overflow Prevention**: Smart layout management preventing horizontal scrolling

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom utilities and responsive breakpoints
- **Animations**: Framer Motion + custom CSS animations
- **Icons**: React Icons (Feather)
- **API**: itbook.store integration
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite with HMR

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunospw/geekynerds.git
   cd geekynerds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookCard.jsx    # Product card with cart controls
│   ├── Header.jsx      # Navigation with search and cart
│   ├── Toast.jsx       # Enhanced notification component
│   ├── HeroSection.jsx # Landing page hero with book showcase
│   ├── ProductSection.jsx # Featured products and categories
│   ├── NewsletterSection.jsx # Email subscription section
│   ├── WhyGeekyNerds.jsx # About section with branding
│   ├── Footer.jsx      # Site footer with links and newsletter
│   └── ...
├── pages/              # Route components
│   ├── LandingPages.jsx # Home page with all sections
│   ├── ProductPage.jsx  # Product listing and search
│   ├── CartPage.jsx     # Enhanced shopping cart
│   └── AboutPage.jsx    # About page
├── lib/                # Utilities and API
│   ├── api.js          # API wrapper for itbook.store
│   └── categories.js   # Shared category definitions
└── assets/             # Static assets and book covers
```

## 🎯 Key Components

### LandingPages
- **Hero Section**: Dynamic book showcase with staggered positioning
- **Product Section**: Trending and favorite books with category pills
- **WhyGeekyNerds**: Brand story with animated logo
- **Newsletter**: Email subscription with responsive form
- **Footer**: Comprehensive site navigation and social links

### ProductPage
- Advanced search and filtering
- Category-based navigation
- Pagination with smooth scrolling
- Grid/list view toggle with mobile-optimized heights
- Skeleton loading states

### BookCard
- **Responsive Layouts**: Grid and list views with mobile-first design
- **Cart Controls**: Inline quantity management (Add/+/−)
- **Real-time Updates**: Live cart synchronization
- **External Links**: Direct product page navigation
- **Mobile Optimization**: Touch-friendly controls and proper spacing

### Header
- **Responsive Navigation**: Mobile-first design with hamburger menu
- **Search Integration**: Desktop search bar with mobile overlay
- **Cart Badge**: Live count updates with proper overflow handling
- **Mobile Menu**: Stacked navigation with search integration
- **Smart Spacing**: Adaptive padding and spacing for all screen sizes

### CartPage
- **Dual Layouts**: Desktop table and mobile card views
- **Quantity Controls**: Input fields with green focus styling
- **Order Summary**: Sticky sidebar with enhanced typography
- **Checkout Flow**: Prototype checkout with success feedback
- **Responsive Design**: Optimized for all device sizes

### Toast
- **Enhanced Design**: Gradient backgrounds with icons
- **Smooth Animations**: Slide-in effects from right
- **Type Support**: Success and notice variants
- **Better UX**: Longer duration and improved positioning

## 🌐 API Integration

The app integrates with the [itbook.store API](https://api.itbook.store) to fetch:
- New and trending books
- Search results with pagination
- Individual book details
- Category-based content

## 📱 Mobile Features

- **Responsive Layout**: No horizontal overflow on any screen size
- **Touch Optimization**: 44px minimum touch targets
- **Mobile-First Design**: Stacked navigation and card layouts
- **Smart Spacing**: Adaptive padding and margins
- **Hidden Scrollbars**: Modern UI with smooth scrolling

## 🎨 Design System

- **Color Palette**: Green-based theme with gradient accents
- **Typography**: Responsive text scaling with system fonts
- **Animations**: Smooth hover effects, page transitions, and micro-interactions
- **Layout**: CSS Grid and Flexbox with Tailwind utilities
- **Responsive Breakpoints**: Mobile-first approach (360px → 640px → 768px+)
- **Glass Morphism**: Subtle backdrop blur and transparency effects

## 🔧 Recent Improvements

### Layout & Responsiveness
- **Fixed Overflow Issues**: Eliminated horizontal scrolling on mobile
- **Responsive Header**: Dynamic width between 360px-640px, full-width on larger screens
- **Mobile Optimization**: Book covers scaled appropriately for small screens
- **Consistent Spacing**: Unified padding and margin system across components

### User Experience
- **Enhanced Cart Page**: Better typography, spacing, and mobile experience
- **Improved Toast**: Modern design with smooth animations
- **Better Navigation**: Enhanced header spacing and hover effects
- **Mobile Touch**: Larger buttons and better touch targets

### Performance & Accessibility
- **Overflow Control**: Smart CSS rules preventing layout issues
- **Focus States**: Green focus rings on form elements
- **Touch Targets**: Proper sizing for mobile interaction
- **Smooth Animations**: Optimized transitions and hover effects

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ by [kunospw](https://github.com/kunospw)
