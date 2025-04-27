# Book Website Project

A dynamic and interactive content management system for a book landing page, featuring comprehensive e-commerce and user management capabilities with advanced admin editing tools.

## Technologies Used

- Frontend: React, Tanstack Query, Vite, Shadcn UI, Tailwind CSS
- Backend: Express.js, Passport.js, Zod (validation)
- Databases: PostgreSQL (default) and MongoDB (optional)
- Payments: Stripe integration

## Key Features

- Responsive book landing page with multiple content sections
- Admin dashboard for content management
- User authentication
- E-commerce functionality with Stripe payments
- Analytics dashboard
- Theme customization

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- PostgreSQL database or MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:

   ```
   # For PostgreSQL (Default)
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   
   # For MongoDB (Optional)
   # DATABASE_URL=mongodb://<username>:<password>@<host>:<port>/<database>
   
   SESSION_SECRET=your_session_secret
   
   # Optional Stripe Integration
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

### Database Setup

#### PostgreSQL (Default)

Initialize the PostgreSQL database:

```bash
npm run db:push
```

#### MongoDB (Optional)

Follow the instructions in [MONGODB_SETUP.md](MONGODB_SETUP.md) to set up and migrate to MongoDB.

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5000.

## Project Structure

- `/client`: Frontend React application
- `/server`: Backend Express API
- `/shared`: Shared types and database schema
- `/scripts`: Utility scripts

## Authentication

- Admin login: Email: `admin@example.com`, Password: `admin123`
- Admin dashboard: `/admin`

## Database Options

This project supports both PostgreSQL and MongoDB as database options:

- **PostgreSQL**: Used by default, offers robust relational data storage
- **MongoDB**: Optional, provides document-based NoSQL storage

For instructions on how to switch between databases, see [MONGODB_SETUP.md](MONGODB_SETUP.md).

## License

MIT