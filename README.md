# 🛒 Modern E-Commerce Website

A modern, responsive and full-stack e-commerce marketplace built with **React.js, Vite, Django REST Framework and MySQL**.

The application provides a complete online shopping experience with product browsing, search and filtering, product details, authentication, shopping cart, wishlist, checkout, orders and vendor-related functionality.

---

## 🌐 Live Demo

🚀 **Frontend:** [View Live Website](YOUR_FRONTEND_URL)

🔗 **Backend API:** [View Backend API](YOUR_BACKEND_URL)

> Replace the above URLs with your deployed frontend and backend links.

---

## 📸 Project Overview

Modern E-Commerce Website is a full-stack marketplace application designed to provide users with a smooth online shopping experience.

The frontend is built using **React.js and Vite**, while the backend is powered by **Django REST Framework**. **MySQL** is used as the database, and **JWT authentication** is used to secure user accounts and protected API endpoints.

---

## 🚀 Features

### 👤 User Authentication

* User registration
* User login
* JWT-based authentication
* Access and refresh tokens
* Protected routes
* User account management
* Logout functionality
* Token refresh
* Token blacklisting
* Secure authenticated API requests

---

### 🏠 Home Page

* Modern responsive landing page
* Product highlights
* Product categories
* Promotional sections
* Responsive navigation
* Clean and user-friendly UI
* Featured products

---

### 🛍️ Product Catalog

* Browse products
* Product details
* Product search
* Category filtering
* Multiple filtering options
* Product sorting
* Pagination
* Responsive product cards
* Product pricing
* Product information
* Vendor-related product information

---

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Increase product quantity
* Decrease product quantity
* Cart item count
* Automatic total calculation
* Persistent cart state
* Cart summary

---

### ❤️ Wishlist

* Add products to wishlist
* Remove products from wishlist
* View wishlist
* Wishlist state management
* Persistent wishlist functionality

---

### 💳 Checkout

* Checkout page
* Customer information
* Order summary
* Cart-to-order flow
* Order confirmation
* Order management

> Payment processing is currently implemented as an application UI/checkout flow rather than a production payment gateway.

---

### 📦 Orders

* Create orders
* View order information
* Order history
* Order-related API functionality
* Backend order management
* Order details

---

### 🏪 Vendor Marketplace

* Vendor listing
* Vendor details
* Vendor pages
* Vendor-related product functionality
* Vendor API services
* Vendor backend application
* Marketplace-oriented architecture

---

### 🎨 User Interface

* Responsive design
* Mobile-friendly layout
* Bootstrap styling
* Lucide React icons
* Reusable React components
* Theme management
* Component-based architecture
* Clean and modern UI

---

## 🧰 Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* React Router DOM
* Axios
* Bootstrap
* Bootstrap Icons
* Lucide React
* React Context API

### Backend

* Python
* Django
* Django REST Framework
* Django Simple JWT
* Django Filters
* Django CORS Headers
* Python Dotenv

### Database

* MySQL

### Development Tools

* VS Code
* Git
* GitHub
* npm
* Python
* MySQL

---

## 🏗️ Project Architecture

The project follows a separate frontend/backend architecture:

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │    Django Backend   │
                    │ Django REST API     │
                    └──────────┬──────────┘
                               │
                               │ ORM
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
```

The React frontend communicates with the Django REST API using **Axios**.

The Django backend handles:

* Authentication
* Users
* Products
* Vendors
* Orders
* Database operations
* API responses
* JWT authorization
* Filtering and pagination

---

# 📂 Project Structure

```text
modern-ecommerce-website/
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── catalog/
│   │   │   ├── checkout/
│   │   │   ├── common/
│   │   │   ├── feedback/
│   │   │   ├── layout/
│   │   │   └── product-detail/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── WishlistContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.js
│   │   │   ├── useFilterParams.js
│   │   │   └── useLocalStorage.js
│   │   │
│   │   ├── pages/
│   │   │   ├── AccountPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CatalogPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── VendorPage.jsx
│   │   │   ├── VendorsPage.jsx
│   │   │   └── WishlistPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── orderService.js
│   │   │   ├── productService.js
│   │   │   └── vendorService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── filterEngine.js
│   │   │   └── formatters.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── routes.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── Backend/
│   │
│   └── core/
│       ├── core/
│       │   ├── settings.py
│       │   ├── urls.py
│       │   ├── asgi.py
│       │   └── wsgi.py
│       │
│       ├── users/
│       ├── vendors/
│       ├── products/
│       ├── orders/
│       │
│       └── manage.py
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* Python
* MySQL
* Git

---

# 🖥️ Frontend Setup

Open a terminal inside the project directory.

### 1. Navigate to Frontend

```bash
cd Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Vite development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🐍 Backend Setup

Open another terminal.

### 1. Navigate to Backend

```bash
cd Backend/core
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install django djangorestframework djangorestframework-simplejwt django-filter django-cors-headers python-dotenv mysqlclient
```

---

# 🗄️ Database Setup

Make sure MySQL is running.

Create the database:

```sql
CREATE DATABASE modern_ecommerce;
```

You can verify it using:

```sql
SHOW DATABASES;
```

---

## 🔐 Environment Variables

Create a `.env` file inside:

```text
Backend/core/.env
```

Example:

```env
DB_NAME=modern_ecommerce
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

DJANGO_SECRET_KEY=your_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### ⚠️ Important

Never commit your real `.env` file to GitHub.

Your `.gitignore` should contain:

```gitignore
# Environment variables
.env
*.env

# Python
__pycache__/
*.py[cod]
venv/
.venv/

# Django
db.sqlite3
staticfiles/

# Node
node_modules/
dist/

# Environment-specific frontend files
Frontend/.env
Frontend/.env.local
Frontend/.env.development.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

# 🔄 Run Database Migrations

From:

```text
Backend/core
```

Run:

```bash
python manage.py makemigrations
```

Then:

```bash
python manage.py migrate
```

---

# 👨‍💻 Create Admin User

Create a Django superuser:

```bash
python manage.py createsuperuser
```

Follow the instructions displayed in the terminal.

You can then access the Django admin panel at:

```text
http://127.0.0.1:8000/admin/
```

---

# ▶️ Start the Backend

Run:

```bash
python manage.py runserver
```

The Django backend will normally run at:

```text
http://127.0.0.1:8000/
```

---

# 🔗 Run Frontend and Backend Together

You need two terminals.

### Terminal 1 — Backend

```bash
cd Backend/core
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔐 Authentication

The backend uses **JWT authentication** through Django REST Framework Simple JWT.

The authentication flow is:

```text
             User
               │
               ▼
       React Login/Register
               │
               ▼
       Django REST API
               │
               ▼
     JWT Access + Refresh
          Tokens
               │
               ▼
       Protected API
          Requests
```

The access token is used for authenticated API requests, while the refresh token is used to obtain a new access token when required.

---

# 🔌 Backend Applications

## 👤 Users

The `users` Django application handles:

* User models
* User registration
* User login
* Authentication
* JWT token functionality
* User profile functionality
* User API endpoints

---

## 🛍️ Products

The `products` application handles:

* Product models
* Product API
* Product serializers
* Product views
* Product filtering
* Product management
* Product-related API endpoints

---

## 📦 Orders

The `orders` application handles:

* Order models
* Order creation
* Order information
* Order serializers
* Order views
* Order API endpoints
* Order management

---

## 🏪 Vendors

The `vendors` application handles:

* Vendor functionality
* Vendor models
* Vendor-related API functionality
* Vendor marketplace features
* Vendor product relationships

---

# 🧩 Frontend Architecture

The React application is divided into reusable layers.

## Components

Reusable UI components are organized by functionality:

```text
auth
cart
catalog
checkout
common
feedback
layout
product-detail
```

---

## Pages

Main application screens include:

```text
Home
Catalog
Product Details
Cart
Wishlist
Checkout
Login
Register
Account
Vendors
Vendor Details
```

---

## Context

React Context API is used for global application state:

```text
AuthContext
CartContext
ThemeContext
WishlistContext
```

These contexts help manage authentication, cart data, theme preferences and wishlist state across the application.

---

## Services

API communication is separated into service modules:

```text
apiClient.js
authService.js
productService.js
orderService.js
vendorService.js
```

This keeps API communication separate from UI components and makes the application easier to maintain.

---

## Custom Hooks

The project contains reusable hooks for:

* Debouncing
* URL filter parameters
* Local storage
* Reusable frontend logic

---

# 🔎 Product Search & Filtering

The application provides product discovery functionality including:

* Product search
* Category filtering
* Multiple filters
* Sorting
* Pagination
* URL-based filter parameters
* Debounced search
* Responsive product browsing

The frontend contains dedicated filtering utilities and custom hooks for managing product search and filtering.

---

# 📱 Responsive Design

The application is designed to work across multiple screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The interface uses responsive Bootstrap layouts and reusable React components.

---

# 🧪 Development

## Frontend Linting

```bash
cd Frontend
npm run lint
```

---

## Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 🚀 Deployment

The application can be deployed using separate frontend and backend hosting.

### Frontend

The React/Vite frontend can be deployed using platforms such as:

* Vercel
* Netlify

### Backend

The Django REST API can be deployed using platforms such as:

* Render
* Railway
* PythonAnywhere
* VPS / Cloud hosting

### Database

For production, use a hosted MySQL-compatible database.

---

# 🔗 Production Architecture

```text
                    Internet
                       │
                       ▼
              ┌──────────────────┐
              │  React + Vite    │
              │     Frontend     │
              └────────┬─────────┘
                       │
                       │ HTTPS / REST API
                       ▼
              ┌──────────────────┐
              │ Django REST API  │
              │     Backend      │
              └────────┬─────────┘
                       │
                       │ Django ORM
                       ▼
              ┌──────────────────┐
              │      MySQL       │
              │     Database     │
              └──────────────────┘
```

---

# 🔒 Security Notes

For production deployment:

* Never commit `.env` files
* Never expose database passwords
* Never expose Django secret keys
* Use environment variables for sensitive information
* Set `DEBUG=False`
* Configure production `ALLOWED_HOSTS`
* Configure production CORS origins
* Use HTTPS
* Use a secure database password
* Rotate credentials if they have previously been exposed
* Keep dependencies updated

---

# 🚧 Future Improvements

Possible future improvements include:

* 💳 Online payment gateway integration
* 🏪 Advanced vendor dashboard
* 👨‍💼 Admin dashboard
* ⭐ Product reviews and ratings
* 📦 Inventory management
* 🚚 Order tracking
* 📧 Email notifications
* 🤖 Product recommendations
* 🖼️ Image upload and cloud storage
* 🚀 Production deployment
* 🧪 Automated testing
* 📚 API documentation
* 🐳 Docker support
* 🔔 Real-time order notifications

---

# 🎯 Learning Objectives

This project demonstrates practical experience with:

* React component architecture
* React Router
* React Context API
* REST API integration
* Axios
* JWT authentication
* Django REST Framework
* Django models and serializers
* API views
* Database relationships
* MySQL
* Product filtering
* Pagination
* Authentication and authorization
* Frontend/backend integration
* Responsive UI development
* Git and GitHub
* Full-stack application architecture

---

# 👨‍💻 Author

## Sundarraj C

**Frontend / Full-Stack Developer**

### Technologies

* HTML5
* CSS3
* JavaScript
* React.js
* Vite
* Bootstrap
* React Router
* Axios
* Python
* Django
* Django REST Framework
* MySQL
* JWT
* Git
* GitHub

---

# 📄 License

This project is created for **learning, development and portfolio purposes**.

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**GitHub Repository:**

[Modern E-Commerce Website](https://github.com/sundar14032005/modern-ecommerce-website)

---

## 📌 Project Summary

**Modern E-Commerce Website** is a full-stack marketplace application combining a modern React frontend with a Django REST API backend and MySQL database.

It demonstrates the development of a complete e-commerce workflow including authentication, product discovery, filtering, cart management, wishlist functionality, checkout, orders and vendor-related features.
