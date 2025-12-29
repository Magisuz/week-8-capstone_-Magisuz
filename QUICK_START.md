# Quick Start Guide

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account OR local MongoDB installation
- pnpm (or npm/yarn)

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in the root directory:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the frontend directory:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

## Getting MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (M0)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `archives` (or your preferred database name)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/archives?retryWrites=true&w=majority
```

## Deployment to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Steps:

1. **Push code to GitHub**

2. **Deploy Backend on Render:**
   - New Web Service
   - Connect GitHub repo
   - Build: `npm install`
   - Start: `npm start`
   - Add env var: `MONGODB_URI` = your MongoDB Atlas connection string

3. **Deploy Frontend on Render:**
   - New Static Site
   - Connect GitHub repo
   - Root directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
   - Add env var: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check MongoDB Atlas Network Access allows your IP (or 0.0.0.0/0 for development)
- Ensure database user has proper permissions

### Port Already in Use
- Change PORT in `.env` file
- Kill process using the port: `npx kill-port 5000` (or your port number)

### CORS Errors
- Ensure `VITE_API_URL` matches your backend URL
- Check backend CORS configuration allows your frontend origin

## Project Structure

```
├── src/                    # Backend source code
│   ├── index.js           # Main server file
│   ├── models/            # MongoDB models
│   └── routes/            # API routes
├── frontend/              # Frontend React application
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── render.yaml           # Render deployment config
├── DEPLOYMENT.md         # Detailed deployment guide
└── package.json          # Backend dependencies

```

