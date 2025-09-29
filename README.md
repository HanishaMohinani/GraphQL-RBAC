# GraphQL RBAC Authentication API (Node.js/Apollo/MongoDB)

This is a modern back-end application built with Node.js and GraphQL, implementing a robust Role-Based Access Control (RBAC) system for authentication and authorization. It uses custom GraphQL directives to enforce permission checks directly within the schema.

## ✨ Features

* GraphQL API: Built using `apollo-server` for flexible, efficient data fetching.
* Role-Based Access Control (RBAC): Permissions are checked at the schema level using a custom @auth directive.
* Secure Authentication: User login/signup secured with JWTs (`jsonwebtoken`) and Bcrypt for one-way password hashing.
* MongoDB Persistence: Uses Mongoose (ODM) for structured interaction with a MongoDB database.
* Environment Configuration: Securely manages credentials using `.env` and the `dotenv` library.

## 🛠️ Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| Server | Node.js, Apollo Server | Hosts the GraphQL API |
| Database | MongoDB, Mongoose (ODM) | Data storage and modeling |
| Authentication | JWT, Bcrypt | Token generation and password security |
| Authorization | Custom GraphQL Directives | Enforces role-based permissions |
| Development | Nodemon, Dotenv | Auto-reloading and environment variables |

## 🚀 Getting Started

### Prerequisites

You need Node.js and npm installed, as well as access to a MongoDB instance (local or Atlas).

### 1. Setup

1.  Clone the repository:
    ```bash
    git clone [YOUR-REPO-URL]
    cd graphql-rbac-auth
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Copy the example file to create your local configuration file.
    ```bash
    cp .env.example .env
    ```
    Edit the newly created `.env` file with your actual secrets and database credentials (as this file is ignored by Git).

    ```env
    # .env (Do NOT commit this file)
    JWT_SECRET=YOUR_RANDOM_SECRET_KEY
    MONGO_URI=mongodb+srv://user:password@cluster.url/graphql_rbac?
    PORT=4000
    ```

### 2. Run the Server

Start the application in development mode with `nodemon`.

```bash
npx nodemon server.js