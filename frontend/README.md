# 🚀 Job Tracker Frontend

A beautiful, modern React frontend for the Job Tracker MERN application. Built with React 19, TailwindCSS, and modern UI/UX principles.

## ✨ Features

- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile
- **Authentication**: Secure login and registration with JWT tokens
- **Job Management**: Create, edit, delete, and search job applications
- **File Uploads**: Support for resume and profile photo uploads
- **Status Tracking**: Visual status indicators with color-coded badges
- **Real-time Search**: Instant search functionality across job applications
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **React Router DOM** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication

## 🎨 UI Components

### Pages
- **Login** - Beautiful gradient login form with validation
- **Register** - User-friendly registration with error handling
- **Dashboard** - Modern table view with search and actions
- **JobForm** - Comprehensive form for adding/editing jobs

### Features
- **Gradient Backgrounds** - Eye-catching blue to indigo gradients
- **Shadow Effects** - Subtle shadows for depth and hierarchy
- **Smooth Transitions** - Hover and focus animations
- **Custom Scrollbars** - Styled scrollbars for better UX
- **Loading States** - Visual feedback during API calls
- **Empty States** - Helpful illustrations when no data exists

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/
│   │   └── AuthContext.js   # Authentication state management
│   ├── pages/
│   │   ├── Login.js         # Login page with beautiful form
│   │   ├── Register.js      # Registration page
│   │   ├── Dashboard.js     # Main dashboard with job table
│   │   └── JobForm.js       # Add/edit job form
│   ├── api.js              # Axios configuration
│   ├── App.js              # Main app component with routing
│   ├── index.css           # Global styles and Tailwind
│   └── index.js            # App entry point
├── package.json
└── README.md
```

## 🎯 Key Features Explained

### Authentication Flow
- **Protected Routes**: Automatic redirect to login if not authenticated
- **Token Management**: JWT tokens stored in localStorage
- **Context Provider**: Global authentication state management

### Job Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **File Uploads**: Resume and profile photo upload with preview
- **Status Tracking**: Applied, Interview, Offer, Rejected, Accepted
- **Search & Filter**: Real-time search across position and company

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with breakpoints
- **Loading States**: Visual feedback during async operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and screen reader support

## 🎨 Design System

### Colors
- **Primary**: Indigo (600, 700)
- **Secondary**: Gray (50-900)
- **Success**: Green (100, 800)
- **Warning**: Yellow (100, 800)
- **Danger**: Red (100, 800)

### Typography
- **Font**: Inter (primary), Fira Code (code)
- **Sizes**: sm, base, lg, xl, 2xl, 3xl
- **Weights**: normal, medium, semibold, bold, extrabold

### Spacing
- **Scale**: 0.25rem increments (1-96)
- **Containers**: max-w-7xl with responsive padding
- **Components**: Consistent 6-8 unit spacing

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 🌐 API Integration

The frontend expects the backend API to be running at `http://localhost:5000/api` with the following endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /jobs` - Get all jobs (with search)
- `POST /jobs` - Create new job
- `PUT /jobs/:id` - Update job
- `DELETE /jobs/:id` - Delete job

## 📱 Responsive Breakpoints

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## 🎭 Animations & Transitions

- **Fade In**: 0.5s ease-in-out
- **Slide Up**: 0.3s ease-out
- **Hover Effects**: 200ms transitions
- **Focus States**: Ring animations

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and validation
- **Protected Routes**: Authentication-based route protection
- **Input Validation**: Client-side form validation
- **XSS Prevention**: Proper input sanitization

## 🎨 Customization

The design system is built with TailwindCSS and can be easily customized by modifying:

- `tailwind.config.js` - Theme configuration
- `src/index.css` - Custom CSS classes and utilities
- Component styles - Individual component styling

## 🚀 Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📄 License

This project is part of the HexlerTech Job Tracker MERN application.

---

**Built with ❤️ using React, TailwindCSS, and modern web technologies**
