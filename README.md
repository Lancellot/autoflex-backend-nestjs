# Product and Raw Material Management API

## Description

This repository contains the backend API of a technical assessment project designed for industrial inventory and production planning scenarios.

The system is responsible for managing products, raw materials, and their production relationships, including stock-based production simulation and prioritization by product value.

## Problem Overview

An industry manufactures multiple products and must control raw material inventory used during production.

The backend must support:

- Full CRUD for products
- Full CRUD for raw materials
- CRUD for product-to-raw-material associations with required quantities
- Production feasibility simulation based on current stock
- Prioritization of production by highest-value products
- Total production value calculation for the suggested production plan

## Features

- RF001: Products CRUD
- RF002: Raw Materials CRUD
- RF003: Product ↔ Raw Material association CRUD
- RF004: Production simulation based on available stock

## Business Rules

- A product can only be suggested for production if all required raw materials are available in sufficient quantity.
- Product-to-raw-material relationships must include the required quantity of each raw material.
- Production simulation prioritizes products with higher business value.
- The system calculates the total value of the suggested production plan.
- Naming conventions are standardized in English (source code and database structures).

## Tech Stack

This project is implemented as a backend API and is compatible with relational database engines.

- Runtime: Node.js
- Language: TypeScript
- Framework: NestJS
- Database: Relational database (PostgreSQL / MySQL / Oracle)
- Testing: Jest (unit and integration/e2e when applicable)

## API Responsibilities

The API is responsible for:

- Exposing endpoints for product and raw material lifecycle management
- Persisting entities and associations in a relational database
- Validating business constraints before write operations
- Simulating production plans from current stock data
- Returning deterministic outputs for production priority and total estimated value

Frontend concerns (UI/UX) are intentionally out of scope in this repository.

## Production Logic Explanation

The production simulation workflow follows these steps:

1. Load current stock of raw materials.
2. Load products and their required raw material quantities.
3. Evaluate which products are feasible with available stock.
4. Sort feasible products by business value (descending priority).
5. Generate a suggested production plan.
6. Compute total projected value for the plan.

This process provides a practical decision-support mechanism for production planning.

## Getting Started

### Prerequisites

- Node.js LTS
- npm
- A configured relational database instance (PostgreSQL, MySQL, or Oracle)

### Installation

```bash
npm install
```

Configure environment variables according to your local database setup before starting the API.

## Running the Project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing

If test suites are configured, use:

```bash
# unit tests
npm run test

# integration/e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

### Notes on Test Coverage

- Unit tests are desirable for controllers/services with isolated business logic.
- Integration/e2e tests are desirable for endpoint contracts and persistence flows.

## Notes

- This repository intentionally contains only the backend/API layer.
- The project is designed for technical evaluation and recruiter review.
- The architecture favors clear separation between domain logic and interface concerns.
