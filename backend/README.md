# Brave Backend

Backend API for the Brave platform - empowering women through technology and community.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **User Profiles**: Complete user profiles with levels, experience, and achievements
- **Game System**: Battle tracking, leaderboards, and game session management
- **Progress Tracking**: Mission completion, character unlocks, and user progression
- **Security**: Rate limiting, input validation, and CORS protection

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Game
- `POST /api/game/session` - Save game session
- `GET /api/game/history` - Get user's game history
- `GET /api/game/leaderboard` - Get global leaderboard

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress/mission` - Complete mission
- `POST /api/progress/character` - Unlock character

### Users
- `GET /api/users/stats` - User statistics (placeholder)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brave
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

3. Start MongoDB locally or update MONGODB_URI for your database

4. Run the server:
```bash
npm start
# or for development
npm run dev
```

## Environment Variables

- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Frontend application URL for CORS

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- Security headers with Helmet

## Database Models

### User
- Authentication info (username, email, password)
- Profile data (avatar, level, experience)
- Game statistics (battles won/lost, favorite character)
- Achievements and progress tracking

### GameSession
- Battle details (characters, winner, duration)
- Move history and damage tracking
- Experience gained from session

## Development

The backend is structured with:
- `models/` - Database schemas
- `routes/` - API route handlers
- `controllers/` - Business logic
- `middleware/` - Authentication and validation
- `config/` - Configuration files

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation for new endpoints
5. Test thoroughly before submitting

## License

This project is part of the Brave platform initiative.