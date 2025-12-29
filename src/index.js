require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For production, you might want to be more restrictive
      callback(null, true); // Allow all origins for now, tighten in production if needed
    }
  },
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB URI is not defined. Please set MONGODB_URI environment variable.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const filesRouter = require('./routes/files');
const movementsRouter = require('./routes/movements');
const authRouter = require('./routes/auth');

app.use('/api/files', filesRouter);
app.use('/api/movements', movementsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Archives Management System Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 