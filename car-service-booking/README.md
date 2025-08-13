# Car Service Booking System

A full-stack web application for booking car services with Angular frontend and Node.js backend.

## Features

- **Authentication**: JWT-based login/logout system
- **Service Management**: CRUD operations for car services
- **Booking System**: Create, view, update, and cancel service bookings
- **User Dashboard**: Overview of bookings and available services
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Graceful error handling with user-friendly messages
- **Logging**: Winston-based logging for backend operations
- **Testing**: Unit tests for both frontend and backend

## Tech Stack

### Frontend
- **Angular 17**: Modern web framework
- **TypeScript**: Type-safe JavaScript
- **Reactive Forms**: Form handling and validation
- **RxJS**: Reactive programming
- **Jasmine/Karma**: Testing framework

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **PostgreSQL**: Relational database
- **JWT**: Authentication tokens
- **Winston**: Logging library
- **Jest**: Testing framework

## Project Structure

```
car-service-booking/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   ├── services/     # Angular services
│   │   │   ├── guards/       # Route guards
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── ...
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── config/           # Configuration files
│   │   └── app.js           # Main application file
│   ├── tests/               # Backend tests
│   ├── database.sql         # Database schema
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE car_service_db;
```

2. Run the database schema:
```bash
psql -U postgres -d car_service_db -f backend/database.sql
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy .env file and update with your database credentials
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Angular CLI globally (if not already installed):
```bash
npm install -g @angular/cli
```

4. Start the development server:
```bash
ng serve
```

The frontend application will be available at `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (authenticated)
- `PUT /api/services/:id` - Update service (authenticated)
- `DELETE /api/services/:id` - Delete service (authenticated)

### Bookings
- `GET /api/bookings` - Get all bookings (authenticated)
- `GET /api/bookings/my-bookings` - Get user's bookings (authenticated)
- `GET /api/bookings/:id` - Get booking by ID (authenticated)
- `POST /api/bookings` - Create new booking (authenticated)
- `PUT /api/bookings/:id` - Update booking (authenticated)
- `DELETE /api/bookings/:id` - Delete booking (authenticated)

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
ng test
```

## Environment Variables

### Backend (.env)
```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=car_service_db
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## Default Services

The system comes with pre-loaded services:
- Oil Change ($49.99, 30 min)
- Brake Inspection ($79.99, 45 min)
- Tire Rotation ($39.99, 20 min)
- Engine Diagnostic ($99.99, 60 min)
- Car Wash ($29.99, 45 min)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.