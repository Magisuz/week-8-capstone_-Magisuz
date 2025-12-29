# MERN Stack Capstone Project

This assignment focuses on designing, developing, and deploying a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course.

## Assignment Overview

You will:
1. Plan and design a full-stack MERN application
2. Develop a robust backend with MongoDB, Express.js, and Node.js
3. Create an interactive frontend with React.js
4. Implement testing across the entire application
5. Deploy the application to production

## Getting Started

1. Accept the GitHub Classroom assignment
2. Clone the repository to your local machine
3. Follow the instructions in the `Week8-Assignment.md` file
4. Plan, develop, and deploy your capstone project

## Files Included

- `Week8-Assignment.md`: Detailed assignment instructions

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git and GitHub account
- Accounts on deployment platforms (Render/Vercel/Netlify/etc.)

## Project Ideas

The `Week8-Assignment.md` file includes several project ideas, but you're encouraged to develop your own idea that demonstrates your skills and interests.

## Deployment

This project is configured for deployment on Render with MongoDB Atlas as the database.

### Quick Deploy to Render

1. **Set up MongoDB Atlas** (see [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions)
2. **Deploy Backend**:
   - Create a new Web Service on Render
   - Set environment variable: `MONGODB_URI` (your MongoDB Atlas connection string)
   - Build command: `npm install`
   - Start command: `npm start`

3. **Deploy Frontend**:
   - Create a new Static Site on Render
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Set environment variable: `VITE_API_URL` (your backend URL + `/api`)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Live URLs:**
- Backend: [Add your backend URL here]
- Frontend: [Add your frontend URL here]

## Submission

Your project will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Commit and push your code regularly
2. Include comprehensive documentation
3. Deploy your application and add the live URL to your README.md
4. Create a video demonstration and include the link in your README.md

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom) 