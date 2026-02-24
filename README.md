<div align="center">

# 🏭 Product & Raw Material Management API

**Industrial inventory management and production planning backend**

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Production Simulation](#-production-simulation)
- [Business Rules](#-business-rules)
- [Testing](#-testing)

---

## 📖 About

A RESTful backend API for managing industrial inventory and production planning. The system handles the full lifecycle of **products** and **raw materials**, including their associations with required quantities, and provides a **production simulation engine** that evaluates manufacturing feasibility based on current stock — prioritizing the highest-value products.

---

## ✨ Features

- **RF001** — Full CRUD for Products
- **RF002** — Full CRUD for Raw Materials
- **RF003** — Product ↔ Raw Material association management with required quantities
- **RF004** — Stock-based production simulation with value-driven prioritization

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js LTS |
| Language | TypeScript |
| Framework | NestJS |
| ORM | TypeORM |
| Database | MySQL · PostgreSQL · Oracle |
| Validation | class-validator · NestJS ValidationPipe |
| Testing | Jest |

---

## 📁 Project Structure

```
src/
├── app.module.ts
├── main.ts
│
├── products/
│   ├── controllers/
│   │   └── product.controller.ts
│   ├── entities/
│   │   └── product.entity.ts
│   ├── services/
│   │   └── product.service.ts
│   └── product.module.ts
│
└── rawMaterials/
    ├── controllers/
    │   └── rawMaterial.controller.ts
    ├── entities/
    │   └── rawMaterial.entity.ts
    ├── services/
    │   └── rawMaterial.service.ts
    └── rawMaterials.module.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js LTS](https://nodejs.org/)
- npm
- A running relational database (MySQL, PostgreSQL, or Oracle)

### Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=db_autoflex
```

> ⚠️ `synchronize: true` is enabled for development. **Disable it in production** to avoid unintended schema changes.

### Running

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod
```

The API will be available at `http://localhost:4000`.

---

## 📡 API Reference

### Products `/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Return all products |
| `GET` | `/products/:id` | Return product by ID |
| `GET` | `/products/name/:name` | Search products by name |
| `GET` | `/products/raw-material/:id` | Return products by raw material |
| `POST` | `/products` | Create a new product |
| `PUT` | `/products` | Update an existing product |
| `DELETE` | `/products/:id` | Delete a product |

<details>
<summary>Request body — POST / PUT</summary>

```json
{
  "name": "Gear Assembly",
  "description": "Heavy-duty gear assembly unit",
  "price": 149.99,
  "rawMaterial": {
    "id": 1
  }
}
```

</details>

---

### Raw Materials `/raw-materials`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/raw-materials` | Return all raw materials |
| `GET` | `/raw-materials/:id` | Return raw material by ID |
| `POST` | `/raw-materials` | Create a new raw material |
| `PUT` | `/raw-materials/:id` | Update a raw material |
| `DELETE` | `/raw-materials/:id` | Delete a raw material |

<details>
<summary>Request body — POST / PUT</summary>

```json
{
  "name": "Steel Sheet",
  "description": "Cold-rolled steel sheet, 2mm thickness"
}
```

</details>

---

## ⚙️ Production Simulation

The simulation engine evaluates which products can be manufactured based on current stock and generates an optimized production plan.

```
┌─────────────────────────────────────────────────────────┐
│                  Production Simulation                  │
├─────────────────────────────────────────────────────────┤
│  1. Load current raw material stock                     │
│  2. Load all products with their material requirements  │
│  3. Evaluate manufacturing feasibility per product      │
│  4. Sort feasible products by value (descending)        │
│  5. Generate suggested production plan                  │
│  6. Return total projected value of the plan            │
└─────────────────────────────────────────────────────────┘
```

This provides production managers with a data-driven decision-support tool to maximize value from available inventory.

---

## 📏 Business Rules

- A product is only suggested for production if **all** of its required raw materials are available in sufficient quantity.
- Product-to-raw-material associations must include the **required quantity** of each material.
- When stock is limited, the simulation **prioritizes higher-value products**.
- The response includes the **total projected value** of the suggested production plan.
- All naming conventions (source code and database) follow **English standards**.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:cov
```

- **Unit tests** — isolate and validate controller and service logic independently.
- **Integration/E2E tests** — cover endpoint contracts and full persistence flows against the database.

---

<div align="center">
  <sub>Backend-only project · Designed for technical evaluation · Frontend is out of scope</sub>
</div>
