MyQuery - Global Q&A Platform

Video Demo: https://your-youtube-link-here

⸻

📌 Description

MyQuery is a full-stack web application that allows users from around the world to ask questions and share knowledge by answering others. The platform is designed to simulate a simplified version of community-driven discussion systems like Stack Overflow and Quora.

The goal of this project is to create a scalable and user-friendly environment where users can interact, learn, and contribute. Users can register, log in, post questions, and provide answers to other users’ queries. All interactions are stored securely using a database, ensuring persistence and reliability.

⸻

🚀 Features
• 🔐 User Authentication (Register / Login / Logout)
• ❓ Ask Questions
• 💬 Answer Questions
• 📋 View All Questions
• 👤 User-specific sessions
• 🕒 Timestamp-based interactions

⸻

🛠️ Tech Stack
• Backend: Node.js, Express.js
• Frontend: HTML, CSS, EJS
• Database: MongoDB
• Authentication: Sessions
• Environment Config: dotenv

⸻

Project Structure

query_app/
│
├── controllers/ # Logic for handling requests
├── models/ # Database schemas
├── routes/ # Application routes
├── views/ # EJS templates
├── public/ # Static files (CSS, JS)
├── utils/ # Helper functions
│
├── app.js # Main server file
├── package.json # Dependencies
├── .env # Environment variables
├── README.md # Project documentation

⸻

⚙️ How It Works 1. Users register and log into the system. 2. After login, users can:
• Post new questions
• Browse existing questions
• View detailed question pages
• Submit answers 3. Data is stored in MongoDB and dynamically rendered using EJS templates.

⸻

🗄️ Database Design

Users Collection
• username
• password (hashed)

Questions Collection
• title
• description
• userId
• createdAt

Answers Collection
• questionId
• userId
• answer
• createdAt

⸻

🤔 Design Decisions

Express.js was used for backend development due to its simplicity and flexibility. MongoDB was chosen as the database because it is schema-flexible and works well with JavaScript-based applications.

The MVC-like folder structure (controllers, models, routes) improves scalability and keeps the code organized.

⸻

⚠️ Challenges Faced
• Managing user authentication and sessions
• Structuring the project for scalability
• Connecting MongoDB with backend logic
• Handling dynamic rendering using EJS

⸻

🔮 Future Improvements
• 👍 Upvote / Downvote system
• 🔍 Search functionality
• 🏷️ Tag-based filtering
• 🌐 Deployment for global access
• 📱 Responsive UI improvements

⸻

🤖 Acknowledgement

Some conceptual guidance was taken from AI tools like ChatGPT. However, all implementation and logic were developed independently as part of learning.

⸻

🎯 Conclusion

MyQuery demonstrates a complete full-stack application using modern web technologies. It showcases backend development, database integration, authentication, and dynamic frontend rendering. This project reflects practical understanding of building scalable and interactive web applications.
