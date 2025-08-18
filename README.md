# Job Tracker - MERN Stack Application

A full-stack job application tracking system built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Job Management**: Create, read, update, and delete job applications
- **File Uploads**: Upload resumes and profile photos
- **Advanced Filtering**: Search, filter by status, and sort job applications
- **Responsive Design**: Modern UI with TailwindCSS
- **Real-time Validation**: Form validation with error handling

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **TailwindCSS 4** - Styling framework
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
HexlerTech/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── utils/
│   │   └── errorResponse.js
│   ├── uploads/
│   │   ├── profiles/
│   │   └── resumes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   └── JobForm.js
    │   ├── App.js
    │   ├── api.js
    │   └── index.css
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   MONGO_URI=mongodb://localhost:27017/jobtracker
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Run Both Servers Concurrently

From the backend directory:
```bash
npm run both
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Jobs
- `GET /api/jobs` - Get all jobs for user (protected)
- `GET /api/jobs/:id` - Get single job (protected)
- `POST /api/jobs` - Create new job (protected)
- `PUT /api/jobs/:id` - Update job (protected)
- `DELETE /api/jobs/:id` - Delete job (protected)

### Query Parameters for GET /api/jobs
- `search` - Search in position and company fields
- `status` - Filter by status (Applied, Interview, Offer, Rejected, Accepted)
- `sort` - Sort by application date (asc/desc)
- `page` - Page number for pagination
- `limit` - Number of results per page

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View all your job applications with filtering and search
3. **Add Job**: Click "Add Job" to create a new job application
4. **Edit Job**: Click on any job to edit its details
5. **File Uploads**: Upload resume and profile photo for each application
6. **Status Tracking**: Update job status as you progress through interviews

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes on both frontend and backend
- Remember me functionality
- Automatic token management

### Job Management
- Complete CRUD operations
- File upload support (resume, profile photo)
- Status tracking with predefined options
- Date handling for application dates
- Notes field for additional information

### Search & Filtering
- Real-time search across position and company
- Filter by application status
- Sort by application date (ascending/descending)
- Pagination for large datasets
- Debounced search to reduce API calls

### User Experience
- Responsive design for all screen sizes
- Loading states and error handling
- Form validation with real-time feedback
- Success/error notifications
- Intuitive navigation

## Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run client` - Start frontend from backend directory
- `npm run both` - Run both backend and frontend concurrently

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email hadi32344@gmail.com or create an issue on GitHub.
