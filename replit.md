# ShirtStore E-commerce Platform

## Overview

ShirtStore is a full-stack e-commerce platform specialized in selling shirts, designed with a Flipkart-inspired interface optimized for both web and mobile devices. The application provides comprehensive shopping functionality including product browsing, filtering, cart management, user authentication, and order processing. Built with modern web technologies, it features a responsive design system using shadcn/ui components and follows a clean architectural pattern separating frontend and backend concerns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: 
  - Zustand for global state (authentication, cart, wishlist, theme)
  - TanStack Query for server state management and caching
  - React Hook Form with Zod validation for form handling
- **Design System**: Consistent component library with dark/light theme support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcryptjs for password hashing
- **API Design**: RESTful API structure with middleware for authentication and authorization
- **Error Handling**: Centralized error handling middleware

### Data Storage Architecture
- **Database**: PostgreSQL with Neon Database serverless connection
- **Schema**: Well-structured relational database with tables for:
  - Users (authentication and profile data)
  - Products (shirt catalog with variants)
  - Cart items and order management
  - Wishlist and reviews
  - Product variants for size/color combinations
- **Migrations**: Drizzle Kit for database schema management

### Authentication & Authorization
- **Strategy**: JWT token-based authentication
- **Security**: Password hashing with bcryptjs
- **Role Management**: Admin/user role distinction for administrative features
- **Session Management**: Token-based sessions with middleware protection

### Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **Development Tools**: 
  - Hot module replacement for fast development cycles
  - TypeScript for type safety across the stack
  - ESBuild for server-side bundling
- **Code Organization**: Monorepo structure with shared schema between client and server

### Mobile Optimization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Touch Interactions**: Optimized for mobile touch interfaces
- **Performance**: Lazy loading and optimized bundle sizes
- **Progressive Enhancement**: Graceful degradation for various device capabilities

### Key Features Architecture
- **Product Catalog**: Advanced filtering system with faceted search
- **Shopping Cart**: Persistent cart state with real-time updates
- **User Management**: Complete authentication flow with profile management
- **Admin Panel**: Separate interface for product and order management
- **Search**: Full-text search capabilities across product catalog

## External Dependencies

### Core Runtime Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM and query builder
- **express**: Web application framework for Node.js
- **jsonwebtoken**: JWT token implementation for authentication
- **bcryptjs**: Password hashing library

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Complete shadcn/ui component suite built on Radix UI
- **State Management**: @tanstack/react-query, zustand
- **Form Handling**: react-hook-form, @hookform/resolvers
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Icons**: lucide-react icon library
- **Validation**: zod schema validation library

### Development Dependencies
- **Build Tools**: Vite, TypeScript, ESBuild
- **Database Tools**: drizzle-kit for migrations and schema management
- **Development Enhancements**: Replit-specific plugins for development experience

### Third-party Services
- **Database**: Neon Database (serverless PostgreSQL)
- **Image Hosting**: Unsplash for product images (development/demo)
- **Fonts**: Google Fonts (Inter, DM Sans, Geist Mono)

### Build and Deployment
- **Production Build**: Optimized Vite build with static asset generation
- **Server Bundle**: ESBuild compilation for Node.js deployment
- **Environment**: Environment-based configuration for development and production