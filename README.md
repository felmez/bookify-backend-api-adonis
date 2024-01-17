# Bookify

Bookify is a simple book search and bookmarking application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Routes](#api-routes)

### Getting Started

#### Prerequisites

Before you begin, make sure you have the following installed:

- NodeJS (at least v14)
- MySQL

#### Installation

1. Clone the project:

   ```bash
   cd projectDirectory
   ```

2. Install dependencies with npm:

   ```bash
   npm install
   ```

   or with yarn:

   ```bash
   yarn
   ```

3. Copy `.env.example` to `.env`.

4. Modify and add your database and API credentials in the `.env` file.

### Usage

#### API Routes

Here are the available API routes:

| Method | Route                   | Handler                     |
| ------ | ----------------------- | --------------------------- |
| POST   | /api/auth/register      | AuthController.register     |
| POST   | /api/auth/login         | AuthController.login        |
| POST   | /api/auth/logout        | AuthController.logout       |
| GET    | HEAD /api/users/profile | UsersController.profile     |
| GET    | HEAD /api/books         | BooksController.index       |
| GET    | HEAD /api/bookmarks     | BookmarksController.index   |
| POST   | /api/bookmarks          | BookmarksController.store   |
| DELETE | /api/bookmarks          | BookmarksController.destroy |
| GET    | HEAD /                  | Closure                     |
| GET    | HEAD /health            | Closure                     |

#### Query Parameters:

1. **Search Books**

   - **Route:**

     ```
     GET /api/books
     ```

   - **Query Parameters:**
     - `page`: Page number (default: 1)
     - `limit`: Number of results per page (default: 10)
     - `query`: Base search query text
     - `title`: Additional keyword for filtering titles
     - `author`: Additional keyword for filtering authors
     - `keyword`: Additional keyword for filtering categories

2. **List Bookmarks**

   - **Route:**

     ```
     GET /api/bookmarks
     ```

   - **Query Parameters:**
     - `page`: Page number (default: 1)
     - `limit`: Number of results per page (default: 10)

### Additional Information

- Authorization Type: Bearer Token
- Bearer Token: `{{accessToken}}`
