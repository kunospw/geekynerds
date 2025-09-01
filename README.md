# GeekyNerds 📚

A modern, responsive e-commerce platform for tech books and programming resources. Built with React, featuring a clean UI, shopping cart functionality, and mobile-optimized design.

## ✨ Features

- **Product Catalog**: Browse and search through a comprehensive collection of tech books
- **Shopping Cart**: Add/remove items with persistent localStorage-based cart
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Real-time Search**: Dynamic search functionality with URL-based state management
- **Category Filtering**: Filter books by programming languages and tech topics
- **Modern UI**: Glass morphism effects, smooth animations, and gradient accents
- **Toast Notifications**: User-friendly feedback for cart actions and checkout
- **Skeleton Loading**: Elegant loading states while fetching data

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)
- **API**: itbook.store integration
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite with HMR

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/geekynerds.git
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
│   ├── Toast.jsx       # Notification component
│   └── ...
├── pages/              # Route components
│   ├── LandingPages.jsx # Home page
│   ├── ProductPage.jsx  # Product listing and search
│   ├── CartPage.jsx     # Shopping cart
│   └── AboutPage.jsx    # About page
├── lib/                # Utilities and API
│   ├── api.js          # API wrapper for itbook.store
│   └── categories.js   # Shared category definitions
└── assets/             # Static assets
```

## 🎯 Key Components

### ProductPage
- Advanced search and filtering
- Category-based navigation
- Pagination with smooth scrolling
- Grid/list view toggle
- Skeleton loading states

### BookCard
- Responsive grid and list layouts
- Inline cart controls (Add/+/−)
- Real-time quantity updates
- External product link integration

### Header
- Mobile-responsive navigation
- Integrated search functionality
- Cart badge with live count updates
- Mobile menu and search overlays

### CartPage
- Desktop table and mobile card layouts
- Quantity adjustment controls
- Order summary calculations
- Toast-based checkout feedback

## 🌐 API Integration

The app integrates with the [itbook.store API](https://api.itbook.store) to fetch:
- New and trending books
- Search results with pagination
- Individual book details
- Category-based content

## 📱 Mobile Features

- Stacked navigation menu
- Touch-friendly cart controls
- Responsive card layouts
- Optimized text sizing
- Hidden scrollbars for modern UI

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

- **Colors**: Green-based palette with accent gradients
- **Typography**: System fonts with responsive scaling
- **Animations**: Subtle hover effects and page transitions
- **Layout**: CSS Grid and Flexbox with Tailwind utilities
- **Theming**: CSS custom properties with dark mode support

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

Built with ❤️ by [Your Name](https://github.com/your-username)
