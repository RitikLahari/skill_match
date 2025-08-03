# Skill Match with MERN Stack

A comprehensive job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to browse job listings, apply for jobs, and manage their applications seamlessly.

## Features

- **User Authentication:** Secure authentication using JWT (JSON Web Tokens) for both job seekers and employers.
- **Job Listings:** Browse through a wide range of job listings fetched from MongoDB.
- **Application Management:** Job seekers can manage their job applications, and employers can view and manage received applications.
- **Responsive Design:** Ensures a seamless experience across all devices.
- ** Generative AI : for Resume screening to auto fill form which enhance the user experiences 

## Technologies Used

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt (for password hash)
- **Image Upload:** Cloudinary for storing and managing uploaded images
- **Deployment:** Vercel (frontend), Vercel(backend), MongoDB Atlas (database)

### Installation

1. Clone the repo:
2. Install NPM packages:

   ```sh
   cd  skill-match
   cd backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:

   ```env
   PORT=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_CLOUD_NAME=
   FRONTEND_URL=
   DB_URL=
   JWT_SECRET_KEY=
   JWT_EXPIRE=
   COOKIE_EXPIRE=
   ```

4. Run the application backend (make sure you are in `/backend` directory) 
   node server.js
 

5. Run the application frontend (make sure you are in `/frontend` directory) :
   ```sh
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173` to view the app.

