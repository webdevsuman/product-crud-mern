# Enterprise Product Management System (MERN Stack)

A high-performance, full-stack inventory management solution architected with the MERN stack. This application leverages modern web technologies to deliver a scalable, type-safe, and responsive user experience, featuring advanced state management and a sophisticated design system.

**Live Production URL:** [https://product-crud-mern.vercel.app/](https://product-crud-mern.vercel.app/)

---

## 🛠️ Technical Highlights

- **Modern Architecture:** Built with **Next.js 15+ (App Router)** and **React 19**, ensuring optimal performance, server-side rendering capabilities, and seamless client-side transitions.
- **Advanced State Management:** Implements **TanStack React Query** for efficient server-state synchronization, automated caching, and optimistic UI updates.
- **Type-Safe Development:** End-to-end type safety across the application using **TypeScript**, reducing runtime errors and improving developer velocity.
- **Data Integrity & Validation:** Robust schema-based validation utilizing **Zod** integrated with **React Hook Form** for seamless user input handling.
- **Sophisticated UI/UX:** A premium design system combining **Material UI (MUI)** for complex interactive components and **Tailwind CSS 4** for precise utility-first styling.
- **Adaptive Theming:** Context-aware theme engine providing high-fidelity support for both Light and Dark modes with smooth transitions.
- **Real-time Search Engine:** High-performance local search logic designed for instantaneous data filtering and optimized rendering.

---

## 💻 Tech Stack & Infrastructure

### Frontend Layer
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Design System:** MUI (Material UI) & Tailwind CSS 4
- **Data Orchestration:** TanStack React Query & Axios
- **Form Management:** React Hook Form & Zod

### Backend Layer (RESTful API)
- **Runtime:** Node.js
- **Middleware:** Express.js
- **Persistence:** MongoDB (via Mongoose ODM)
- **Security:** CORS, Environment-based configuration

---

## 📂 System Architecture (Frontend)

The codebase follows a modular architecture promoting separation of concerns and reusability:

```text
frontend/
├── app/                # Core routing and layout definitions
├── components/         # High-level business logic components
├── ui/                 # Atomic UI components and design tokens
├── react-query/        # Data fetching hooks and provider configuration
├── theme/              # Design system tokens and MUI/Tailwind configuration
├── utils/              # Shared utility functions and API abstractions
└── typescript/         # Centralized type definitions and interfaces
```

---

## 🚀 Deployment & Local Setup

### Prerequisites
- Node.js v18.0.0 or higher
- MongoDB Instance (Local or Atlas)

### Development Environment Setup

1. **Clone & Initialize:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Dependency Installation:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Configure the following in a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
   ```

4. **Launch Application:**
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:3000`.

---

## 📋 API Specification (REST)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Create a new product resource |
| `GET` | `/api/products` | Fetch all product records |
| `GET` | `/api/products/:id` | Retrieve a specific product by ID |
| `PUT` | `/api/products/:id` | Update an existing product resource |
| `DELETE` | `/api/products/:id` | Remove a product resource |

---

## 🏗️ Future Roadmap
- [ ] Integration of Swagger/OpenAPI for automated documentation.
- [ ] Implementation of Role-Based Access Control (RBAC).
- [ ] Advanced analytics dashboard for inventory trends.
