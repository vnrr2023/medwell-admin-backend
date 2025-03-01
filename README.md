# MedWell Admin Backend

## Overview
MedWell Admin Backend is the backend service for the MedWell admin panel, built using Node.js, Express, and MongoDB. It manages user authentication, file uploads, and user approval status.

## Features
- User authentication (login & registration)
- File upload handling (Multer)
- User approval management
- Secure database connection (MongoDB)
- Deployable on Vercel

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Upload:** Multer
- **Deployment:** Vercel

## Directory Structure
```
└── vnrr2023-medwell-admin-backend/
    ├── README.md
    ├── package.json
    ├── vercel.json
    ├── src/
    │   ├── app.js
    │   ├── index.js
    │   ├── controllers/
    │   │   └── authController.js
    │   ├── db/
    │   │   └── db.js
    │   ├── middleware/
    │   │   ├── auth.js
    │   │   └── upload.js
    │   ├── models/
    │   │   └── User.js
    │   └── routes/
    │       ├── authRoutes.js
    │       └── userRoutes.js
    └── uploads/
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/vnrr2023-medwell-admin-backend.git
   cd vnrr2023-medwell-admin-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure environment variables:
   ```sh
   PORT=5000
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_secret_key
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints

### User Routes
- `GET /api/users/getUser` - Fetch all users
- `POST /api/users/addUser` - Add a new user (with file upload)
- `PUT /api/users/approve/:id` - Update user approval status

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

## Deployment
### Deploy on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```
3. Set environment variables in Vercel Dashboard.

## License
This project is licensed under the MIT License.

