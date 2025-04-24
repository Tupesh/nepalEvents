
# Nepali Cultural Event Registration System

A web application for managing and registering for traditional Nepali cultural events like weddings, Bratabandha ceremonies, and Pasni celebrations.

## Features

- User authentication and authorization
- Browse and register for cultural events
- Shopping cart functionality
- Secure checkout with Khalti payment integration
- Responsive design for all devices

## Prerequisites

### Required Software
- Node.js (version 20 or later)
- npm (comes with Node.js)
- PostgreSQL database (automatically provided by Replit)

### Environment Variables
The following environment variables need to be set in Replit's Secrets tab:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session management
- `KHALTI_PUBLIC_KEY`: Khalti payment gateway public key
- `KHALTI_SECRET_KEY`: Khalti payment gateway secret key

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Stable internet connection
- Minimum 1GB RAM

## Project Structure

```
├── client/               # Frontend React application
├── server/              # Backend Express server
└── shared/              # Shared types and schemas
```

## Setup Instructions

1. **Fork the Project**
   - Visit the project URL on Replit
   - Click "Fork" to create your own copy

2. **Configure Environment Variables**
   - Go to "Secrets" tab in your Replit workspace
   - Add required environment variables (see Prerequisites section)

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   - Click the "Run" button in Replit, or
   - Run `npm run dev` in the terminal
   - The server will start on port 5000

5. **Access the Application**
   - The application will be available at the URL shown in Replit's webview

## Tech Stack

### Frontend
- React 18 with TypeScript
- TailwindCSS for styling
- Radix UI components
- React Query for data fetching
- Wouter for routing

### Backend
- Express.js with TypeScript
- PostgreSQL database (via Neon)
- Session-based authentication
- Khalti payment gateway integration

## Development Guidelines

- Follow TypeScript best practices
- Use provided UI components from the components library
- Implement proper error handling
- Follow RESTful API conventions
- Keep code modular and maintainable

## API Endpoints

- `/api/auth/*` - Authentication routes
- `/api/events/*` - Event management
- `/api/cart/*` - Shopping cart operations
- `/api/checkout/*` - Payment and checkout

## Common Issues & Solutions

1. **Database Connection Issues**
   - Verify DATABASE_URL in Secrets tab
   - Check database credentials

2. **Payment Integration**
   - Ensure Khalti keys are correctly set
   - Test with Khalti's test mode first

3. **Authentication Problems**
   - Clear browser cookies
   - Check session configuration

## Deployment

The project is automatically deployed through Replit:
1. All changes are deployed when pushed to the main branch
2. The application runs on Replit's infrastructure
3. Database migrations run automatically

## Support

For any issues or questions:
1. Check the documentation first
2. Use Replit's built-in debugging tools
3. Contact the development team through Replit
