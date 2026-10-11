# EnglishTeachingPlatform

## Overview

EnglishTeachingPlatform is a backend REST API designed to help me manage my own online English teaching business. The platform allows me to organize user accounts, English lesson packages, scheduled teaching sessions, and student enrollments.

The purpose of this software is to strengthen my backend development skills by building a practical application based on a real-world business need. Rather than creating a generic practice project, I am developing a system that can support the management of my own online English teaching activities.

The platform currently provides functionality for managing:

- User accounts for students, teachers, and administrators
- English lesson packages
- Scheduled teaching sessions
- Student enrollments
- User registration and login
- JWT-based authentication

The application uses a relational database to store and manage its data. PostgreSQL is used to define relationships between users, packages, teaching sessions, and enrollments, helping maintain data consistency.

The API is organized into separate modules for database access, models, controllers, routes, middleware, and types. This structure separates responsibilities and makes the application easier to maintain and extend.

User registration includes password hashing with bcrypt, while login verifies credentials and generates a JSON Web Token (JWT). Authentication middleware verifies tokens before allowing access to protected endpoints.

The project is being developed incrementally, with a focus on backend API development, relational database design, SQL queries, authentication, and data integrity.

Payment processing is currently outside the scope of this version of the application.

## Development Environment

The software was developed using the following tools and technologies:

- Visual Studio Code
- Node.js
- npm
- TypeScript
- Express.js
- PostgreSQL
- pg (node-postgres)
- JSON Web Token (JWT)
- bcrypt
- ESLint
- Prettier
- Postman for testing API endpoints
- Git
- GitHub

The primary programming language used in this project is **TypeScript**.

The backend uses **Node.js and Express.js** to build the REST API. TypeScript interfaces and types define the structure of application data and improve type safety throughout the application.

**PostgreSQL** serves as the relational database management system. SQL queries are used to create tables, insert records, retrieve data, update records, and manage relationships between entities.

The database contains the following main tables:

- `users` — stores user account information, roles, and account status.
- `packages` — stores English lesson package details, including level, type, duration, and price.
- `sessions` — stores scheduled teaching sessions, including dates, times, capacity, and meeting links.
- `enrollments` — connects students with teaching sessions and tracks enrollment status.

The project follows a modular structure with separate folders for:

- Configuration
- Types
- Models
- Controllers
- Routes
- Middleware

## Useful Websites

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres Documentation](https://node-postgres.com/)
- [JSON Web Token Documentation](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [MDN Web Docs](https://developer.mozilla.org/)
- [REST API Overview — MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/)

## Software Demonstration

A demonstration of the software running and a walkthrough of the code are available here:

[Software Demo Video](https://www.loom.com/share/99fb95f24ef84f15b8194b22f74402b3)