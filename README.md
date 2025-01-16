# Blogging Website (Server-Side Rendering)

This is a basic blogging website built using **Express**, **Mongoose**, **EJS**, and **Bootstrap**. The project leverages server-side rendering (SSR) to dynamically generate HTML pages with content retrieved from a MongoDB database.

## Features

- **Server-Side Rendering (SSR)**: Uses EJS templating engine to render dynamic content on the server and send it to the client.
- **CRUD Operations**: Ability to create, read, update, and delete blog posts stored in MongoDB.
- **Responsive Design**: The UI is responsive and mobile-friendly, thanks to **Bootstrap**.
- **Logging and Monitoring**: The app uses **Morgan** to log HTTP requests for better monitoring.
- **Environment Variables**: Configuration via **dotenv** to manage environment-specific settings.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **Template Engine**: EJS for server-side rendering
- **CSS Framework**: Bootstrap for styling
- **HTTP Logging**: Morgan for logging HTTP requests
- **Environment Configuration**: dotenv for managing environment variables

## Installation

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB set up (locally or through a cloud service like MongoDB Atlas).
  
### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:
   ```bash
   cd blogging-website-nodejs
   npm install
   ```

3. Create a `.env` file in the root directory to store environment variables. Example `.env` file:

   ```env
   PORT=8000
   DB_URI=mongodb://localhost:27017/blogging
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   This will start the server using **Nodemon** (it will automatically restart the server when file changes are detected).

5. Open your browser and navigate to `http://localhost:8000` to view the website.

## Folder Structure

```
/blogging-website-nodejs
├── /views                 # EJS templates
├── /models                # Mongoose models for MongoDB
├── /public                # Static files (CSS, JS, images)
├── index.js               # Main server file (Express setup)
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── /node_modules          # Node.js modules
```

## Scripts

- `npm run dev`: Start the server using Nodemon for development.
- `npm start`: Start the server in production mode.

## Contributing

Feel free to fork this repository, submit issues, and send pull requests for improvements.

## License

This project is licensed under the ISC License.

