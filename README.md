React Blog Website
==================

This is a full-stack blog application built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database. The application allows users to view blog posts, read individual articles, comment on posts, search for content, and share blog posts through social media. The design is fully responsive and optimized for various devices and browsers.

Features
--------

- Frontend developed with React
- Blog posts include title, content, publication date, and image
- Comment section available on each blog post
- Responsive design for mobile, tablet, and desktop
- Navigation menu to move across different sections
- Search functionality to find blog posts
- Social media sharing buttons
- Category filters to organize blog content
- Cross-browser compatibility
- Code is clean and well-commented for easy maintenance

Technologies Used
------------------

Frontend:
- React.js
- HTML5
- CSS3
- JavaScript

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Project Structure
-----------------

myblog/
├── client/                 React frontend
│   ├── public/
│   └── src/
│       ├── components/     Reusable UI components
│       ├── pages/          Page views
│       ├── App.js          Main application file
│       └── index.js        React entry point
├── server/                 Node.js backend
│   ├── models/             Mongoose schemas for Blog and Comments
│   ├── routes/             API route definitions
│   ├── controllers/        Route handling logic
│   ├── config/             Database configuration
│   └── server.js           Express server setup
├── .env                    Environment variables
├── package.json            Project metadata
└── README.txt              Project documentation

How to Run the Project Locally
------------------------------

1. Clone the repository:

   git clone https://github.com/Amarnath-coder405/myblog_app
   cd myblog_app

2. Install backend dependencies:

   cd server
   npm install

3. Install frontend dependencies:

   cd ../blog-frontend
   npm install

4. Set up environment variables:

   In the server folder, create a file named `.env` and add the following:

   MONGO_URI="Your mongo_db uri"
   PORT=3001

5. Start the backend server:

   cd server
   npm run start

6. Start the frontend development server:

   cd ../blog-frontend
   npm run start

7. Open your browser and go to:

   http://localhost:3000

Author
------

Developed by Amarnath
GitHub Profile: https://github.com/Amarnath-coder405/myblog_app.git

If you find this project useful, please consider starring the repository on GitHub.
