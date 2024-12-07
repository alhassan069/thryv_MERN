# Description

This is a containerized Node.js (Javascript) app that integrates MySQL and Redis to allow users to easily revisit products they've recently shown interest in.

## **Features**

### Backend
- **User Registration & Login**:
  - Secure password storage using bcrypt.
  - JWT-based authentication.
- **Products API**:
  - View all products.
  - Fetch individual product details.
  - Recently viewed products tracked per user.
- **Redis Integration**:
  - Caches recently viewed products for fast access.
- **Middleware**:
  - Tracks product views and updates recently viewed lists.
  - Authentication middleware to secure API endpoints.

### Frontend
- **React Application**:
  - Product list display using React Bootstrap.
  - Dynamic routing for product details.
  - Recently viewed items section.
- **User Authentication**:
  - Register and login forms with client-side validation.
  - Navigation updates based on authentication state.

---

## **Technologies Used**

### Backend
- **Node.js**
- **Express.js**
- **MySQL** with **Sequelize ORM**
- **Redis**
- **JWT** for Authentication

### Frontend
- **React** with **React Router**
- **React Bootstrap** for UI components
- **Axios** for API communication

---

## **Setup Instructions**

### Prerequisites
- **Node.js**: v16 or higher
- **Docker**: Latest version
- **Redis** and **MySQL** installed locally or using Docker

---


## **Setup Instructions**

### Using Docker

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
2. Populate dummy products data after the containers are up and running 
   ```bash
   docker exec -it thryv-backend-1 node init_db/insertProducts.js
   ```
3. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)
   - Open API documentation (Swagger): [http://localhost:5000/api-docs](http://localhost:5000/api-docs)



### Local Setup

#### Prerequisites
- **Node.js**: v16 or higher
- **Docker**: Latest version
- **Redis** and **MySQL** installed locally or using Docker

---


1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mern-assessment
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory:
     ```env
     PORT=
     DB_HOST=
     DB_PORT=
     DB_USER=
     DB_PASSWORD=
     DB_NAME=
     JWT_SECRET=
     REDIS_HOST=
     REDIS_PORT=
     ```

4. Start the backend:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

6. Populate the dummy data: 
    ```bash
    cd backend 
    node init_db/insertProducts.js
    ```
   
## **API Endpoints**

### Authentication
- **POST** `/api/v1/register`: Register a new user.
- **POST** `/api/v1/login`: Authenticate a user.

### Products
- **GET** `/api/v1/products`: Fetch all products.
- **GET** `/api/v1/products/:id`: Fetch details for a specific product.

### Recently Viewed
- **GET** `/api/v1/users/recentlyViewed`: Fetch a user’s recently viewed products.

---