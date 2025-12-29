# Deployment Guide - Archives Management System

This guide will walk you through deploying the Archives Management System to Render using MongoDB Atlas as the database.

## Prerequisites

1. **MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Render Account**
   - Sign up at [Render](https://render.com)
   - Connect your GitHub account

3. **GitHub Repository**
   - Push your code to GitHub

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Cluster** (if you don't have one)
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region
   - Create the cluster

2. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

3. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for simplicity
   - Click "Confirm"

4. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `archives`)

   Example connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/archives?retryWrites=true&w=majority
   ```

## Step 2: Deploy Backend to Render

1. **Create a New Web Service**
   - Log in to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

2. **Configure Backend Service**
   - **Name**: `archives-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: Leave empty (root of the repository)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

3. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render provides this automatically, but set it just in case)
   - `MONGODB_URI` = Your MongoDB Atlas connection string from Step 1

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Note your backend URL (e.g., `https://archives-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

1. **Create a New Static Site**
   - In Render Dashboard, click "New +" → "Static Site"
   - Connect the same GitHub repository

2. **Configure Frontend Service**
   - **Name**: `archives-frontend` (or your preferred name)
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Set Environment Variables**
   Click "Add Environment Variable" and add:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
     (Replace `your-backend-url` with your actual backend service name)

4. **Deploy**
   - Click "Create Static Site"
   - Wait for the deployment to complete
   - Your frontend will be live at the provided URL

## Step 4: Update CORS Settings (if needed)

If you encounter CORS errors, update the backend `src/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

## Step 5: Verify Deployment

1. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com/`
   - You should see: "Archives Management System Backend"

2. **Test Frontend**
   - Visit your frontend URL
   - Try logging in with an existing account or create a new one

## Environment Variables Summary

### Backend (.env or Render Environment Variables)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/archives?retryWrites=true&w=majority
```

### Frontend (Render Environment Variables)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Errors**
   - Verify your MongoDB Atlas connection string is correct
   - Check that your IP is allowed in Network Access
   - Ensure database user credentials are correct

2. **Port Issues**
   - Render automatically provides PORT via environment variable
   - Ensure your code uses `process.env.PORT || 5000`

3. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Frontend Issues

1. **API Connection Errors**
   - Verify `VITE_API_URL` environment variable is set correctly
   - Check browser console for CORS errors
   - Ensure backend URL includes `/api` suffix

2. **Build Failures**
   - Check that all frontend dependencies are installed
   - Verify Vite configuration is correct
   - Check build logs in Render dashboard

### General Issues

1. **Service Not Starting**
   - Check Render logs for detailed error messages
   - Verify environment variables are set correctly
   - Ensure start commands are correct

2. **Cold Starts**
   - Free tier services on Render spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading to paid plan for always-on services

## Using render.yaml (Alternative Method)

If you prefer to use the `render.yaml` file included in this project:

1. Push `render.yaml` to your repository
2. In Render Dashboard, click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect and use `render.yaml`
5. **Important**: You'll still need to manually set environment variables in the Render dashboard:
   - `MONGODB_URI` for backend
   - `VITE_API_URL` for frontend

## Post-Deployment

1. **Update MongoDB Connection** (if needed)
   - Your MongoDB connection string should work from any IP (0.0.0.0/0)
   - For production, consider restricting IPs to Render's IP ranges

2. **Set Up Custom Domain** (Optional)
   - In Render dashboard, go to your service
   - Click "Settings" → "Custom Domain"
   - Follow Render's instructions

3. **Monitor Logs**
   - Use Render's log viewer to monitor your application
   - Set up alerts for errors (paid plans)

## Security Notes

- Never commit `.env` files to Git
- Use Render's environment variables for sensitive data
- Keep your MongoDB Atlas credentials secure
- Consider using MongoDB Atlas IP whitelisting in production
- Regularly update dependencies

## Support

For issues:
- Check Render documentation: https://render.com/docs
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
- Review application logs in Render dashboard

