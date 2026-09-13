# Overview

EnglishTeachingPlatform is a backend REST API designed to help me manage my own online English teaching business. As an English teacher, I use the platform to organize my students, lesson packages, scheduled teaching sessions, student enrollments, and payments.

The purpose of this software is to strengthen my backend development skills by building a practical application based on a real-world business need. Instead of creating a generic practice project, I am developing a system that can support the way I manage my own English teaching activities.

The platform currently provides functionality for managing:

- Students
- English lesson packages
- Scheduled teaching sessions
- Student enrollments
- Payments

The platform is intended for my use as the teacher and administrator. Students are represented as records in the system, but they do not directly use the platform.

The application currently uses in-memory data structures during development. The architecture is organized so that the data layer can later be replaced with a relational database as the application grows.

The payment functionality currently simulates payment processing. It is designed around an enrollment-based payment workflow that can later be connected to a real Mobile Money payment provider.

A short demonstration of the software running and a walkthrough of the code are available here:

[Software Demo Video](https://youtu.be/2RzZBlCCib8)

# Development Environment

The software was developed using the following tools and technologies:

- Visual Studio Code
- Node.js
- npm
- TypeScript
- Express.js
- ESLint
- Prettier
- REST Client for testing API endpoints
- Git
- GitHub

The main programming language used in this project is **TypeScript**.

The backend uses **Node.js and Express.js** to build the REST API. TypeScript interfaces and types are used to define the structure of the application's data and improve type safety throughout the application.

The project follows a modular structure with separate folders for:

- Types
- Data
- Controllers
- Routes

# Useful Websites

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

- [Express.js Documentation](https://expressjs.com/)

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)

- [MDN Web Docs](https://developer.mozilla.org/)

- [REST API Design - MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST)

- [ESLint Documentation](https://eslint.org/docs/latest/)

- [Prettier Documentation](https://prettier.io/docs/)