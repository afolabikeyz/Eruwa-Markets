# AI SOFTWARE DEVELOPMENT PROMPT

## PROJECT TITLE

DESIGN AND IMPLEMENTATION OF AN ONLINE MARKET DAY SYSTEM WITH INTELLIGENT RECOMMENDATION ENGINE, REAL-TIME NOTIFICATION, DIGITAL PAYMENT INTEGRATION, AND SMART MARKET-DAY DISCOVERY SYSTEM

### CASE STUDY:

Ibadan Markets, Oyo State, Nigeria

---

# ROLE

Act as a Senior Software Architect, Full-Stack Engineer, AI/ML Engineer, UI/UX Designer, Database Architect, Cloud Engineer, DevOps Engineer, Cybersecurity Specialist, Product Manager, and Technical Documentation Expert.

Design and build a complete enterprise-grade production-ready web application.

The application must follow:

* Clean Architecture
* SOLID Principles
* Domain-Driven Design (DDD)
* Microservice-ready Architecture
* RESTful API Standards
* Secure Coding Standards
* OWASP Best Practices
* Mobile-First Responsive Design
* Cloud-Native Deployment Practices

The system must be suitable for:

* Final Year Project
* HND Project
* B.Sc Project
* M.Sc Project
* Real-World Commercial Deployment

---

# PROJECT BACKGROUND

Traditional market-day activities in Ibadan markets are largely physical and fragmented.

Many buyers do not know:

* Which markets are active today
* Upcoming market days
* Available products
* Participating vendors
* Best prices
* Trending products

Vendors struggle with:

* Limited visibility
* Inventory management
* Customer acquisition
* Sales analytics

This system will digitize market-day operations by providing:

* Online marketplace
* Vendor stores
* Smart product recommendations
* Market-day discovery
* Real-time notifications
* Digital payments
* Business analytics

---

# MARKETS TO SUPPORT

Include the following markets:

* Bodija Market (Daily Market)
* Ogunpa Market (Daily Market)
* Oje Market
* Bode Market
* Ojoo Market (Every Three Days Cycle)
* Moniya Market
* Dugbe Market
* Gbagi Market
* Oja'ba Market
* Olofi Market

The system must support:

* Daily markets
* Weekly markets
* Recurring market cycles
* Special market events

---

# USER ROLES

## Buyer

Capabilities:

* Register account
* Login
* Browse markets
* Discover market days
* Browse products
* Search products
* Follow vendors
* Save favorites
* Receive recommendations
* Add products to cart
* Checkout
* Make payment
* Track orders
* Leave reviews
* Receive notifications

---

## Vendor

Capabilities:

* Register store
* Upload products
* Manage inventory
* Manage orders
* Create promotions
* View analytics
* Manage profile
* Respond to reviews
* Receive notifications

---

## Market Administrator

Capabilities:

* Manage markets
* Manage users
* Manage vendors
* Approve products
* Manage transactions
* Manage advertisements
* Manage market schedules
* Configure recommendations
* Configure notifications
* View analytics

---

# CORE MODULES

## Authentication Module

Features:

* Registration
* Login
* Logout
* Email Verification
* Password Reset
* JWT Authentication
* Refresh Tokens
* Role-Based Access Control
* Two-Factor Authentication

---

## Market Day Discovery Module

Features:

* Market Calendar
* Upcoming Market Days
* Market Countdown Timer
* Market Search
* Market Location Information
* Market Event Scheduling
* Market Notifications

The system should automatically determine:

* Active markets today
* Markets opening tomorrow
* Markets opening this week
* Upcoming special market events

---

## Vendor Store Module

Features:

* Store Creation
* Store Profile
* Store Verification
* Store Ratings
* Store Analytics

---

## Product Management Module

Features:

* Product Upload
* Product Editing
* Product Categories
* Product Images
* Product Inventory
* Product Variations
* Product Approval Workflow

---

## Shopping Cart Module

Features:

* Add to Cart
* Remove from Cart
* Save for Later
* Checkout
* Order Summary

---

## Order Management Module

Features:

* Order Placement
* Order Tracking
* Order Status Updates
* Delivery Management
* Refund Requests

---

## Recommendation Engine

Implement:

### Content-Based Filtering

Recommend products based on:

* Product categories
* Product tags
* User interests
* Browsing history

### Collaborative Filtering

Recommend products based on:

* Similar users
* Purchase patterns
* User behavior

### Hybrid Recommendation Model

Combine both algorithms.

Recommendations should appear on:

* Homepage
* Product Pages
* Vendor Stores
* Checkout Page

---

## Notification System

Real-Time Notifications using:

* WebSockets
* Push Notifications
* Email
* SMS
* In-App Notifications

Notification Events:

* New Order
* Order Shipped
* Order Delivered
* Product Recommendation
* Market Day Reminder
* Promotion Alert
* Payment Successful
* Payment Failed

---

## Payment Module

Integrate:

* Paystack
* Flutterwave

Features:

* Payment Initialization
* Payment Verification
* Refund Processing
* Transaction History
* Receipt Generation

---

## Review and Rating Module

Features:

* Product Reviews
* Vendor Reviews
* Star Ratings
* Review Moderation

---

## Analytics Module

### Admin Dashboard

Display:

* Total Users
* Total Vendors
* Total Products
* Daily Revenue
* Monthly Revenue
* Active Markets
* Top Categories
* Top Vendors

### Vendor Dashboard

Display:

* Revenue
* Orders
* Product Views
* Conversion Rate
* Inventory Status

---

# TECHNOLOGY STACK

Frontend:

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* ShadCN UI
* Zustand
* TanStack Query
* Recharts

Backend:

* NestJS
* Node.js
* TypeScript

AI Service:

* Python
* FastAPI
* Scikit-Learn
* Pandas
* NumPy

Database:

* PostgreSQL

Cache:

* Redis

Storage:

* AWS S3
* Cloudinary

Real-Time:

* Socket.IO
* WebSockets

Deployment:

* Docker
* Docker Compose
* Nginx
* Vercel
* Railway
* AWS

---

# DATABASE TABLES

Generate complete schema for:

* users
* roles
* permissions
* vendors
* stores
* markets
* market_days
* market_events
* categories
* products
* product_images
* carts
* cart_items
* orders
* order_items
* payments
* reviews
* recommendations
* notifications
* wishlists
* subscriptions
* advertisements
* audit_logs
* system_settings

Requirements:

* UUID Primary Keys
* Foreign Keys
* Indexes
* Constraints
* Soft Deletes
* Audit Trails
* Created At
* Updated At

---

# API REQUIREMENTS

Generate complete REST API documentation.

Include:

* Authentication APIs
* Market APIs
* Product APIs
* Vendor APIs
* Order APIs
* Payment APIs
* Notification APIs
* Recommendation APIs
* Analytics APIs

Include:

* Request Examples
* Response Examples
* Validation Rules
* Error Handling

---

# SECURITY REQUIREMENTS

Implement:

* JWT Authentication
* Refresh Tokens
* RBAC
* Password Hashing (bcrypt)
* Rate Limiting
* CSRF Protection
* XSS Prevention
* SQL Injection Prevention
* Input Validation
* Secure File Uploads
* Audit Logging

---

# FRONTEND PAGES

Public:

* Landing Page
* About
* Contact
* Market Directory
* Market Calendar

Buyer Portal:

* Dashboard
* Markets
* Products
* Cart
* Orders
* Recommendations
* Notifications
* Wishlist
* Profile

Vendor Portal:

* Dashboard
* Store Management
* Product Management
* Orders
* Analytics
* Notifications

Admin Portal:

* Dashboard
* Markets
* Users
* Vendors
* Products
* Orders
* Notifications
* Reports
* Settings

---

# DELIVERABLES

Generate:

1. Complete Folder Structure
2. Database ERD
3. PostgreSQL Schema
4. Backend Source Code
5. Frontend Source Code
6. AI Recommendation Engine
7. REST API Documentation
8. Authentication System
9. Notification System
10. Payment Integration
11. Docker Configuration
12. Environment Variables
13. CI/CD Pipeline
14. Testing Strategy
15. Unit Tests
16. Integration Tests
17. Deployment Guide
18. Technical Documentation
19. User Manual
20. Administrator Manual

The generated solution must be production-ready, scalable, secure, maintainable, well-documented, and suitable for both academic defense and commercial deployment.
