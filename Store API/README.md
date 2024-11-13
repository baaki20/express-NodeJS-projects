# Store API

This is a RESTful API for an online store, built using **Node.js** and **Express.js**. This backend server provides endpoints to retrieve and filter a collection of products with various parameters, making it efficient for e-commerce applications.

## Features

- **Retrieve All Products**: Fetch all products, with optional query parameters for filtering, sorting, and pagination.
- **Query Filters**:
  - **Featured**: Retrieve only featured products.
  - **Company**: Filter products based on the company.
  - **Name**: Search for products by name (case-insensitive).
  - **Numeric Filters**: Filter by numerical fields like `price` and `rating` with operators (>, >=, =, <, <=).
  - **Sorting**: Sort products by one or more fields.
  - **Field Selection**: Specify which fields to retrieve in the response.
- **Pagination**: Limit and skip results to retrieve products in pages.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for handling HTTP requests
- **MongoDB**: Database for storing product information (assuming use of Mongoose in models)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/baaki20/express-NodeJS-projects.git
   cd 'Store API'
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables as needed, typically including the following:

   - `PORT`: Port number on which the server runs
   - `DATABASE_URL`: Connection string for MongoDB

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Product Endpoints

#### Get All Products

   ```http
   GET /api/v1/products
   ```

- **Query Parameters**:
  - **featured**: `true` or `false` (e.g., `?featured=true`)
  - **company**: Filter by company name (e.g., `?company=ikea`)
  - **name**: Search by product name, case-insensitive (e.g., `?name=shelf`)
  - **sort**: Comma-separated list of fields to sort by (e.g., `?sort=price,-rating`)
  - **fields**: Comma-separated list of fields to include in the response (e.g., `?fields=name,price`)
  - **numericFilters**: Use operators to filter numeric fields like `price` and `rating` (e.g., `?numericFilters=price>100,rating>=4`)
  - **limit**: Number of products per page (default: 10)
  - **page**: Page number for pagination (default: 1)

- **Response**: Returns an array of products matching the filters, with `nHits` indicating the total number of products returned.

## Error Handling

The API provides structured error responses with meaningful messages and appropriate HTTP status codes, such as 400 for bad requests and 404 for not found.

## Example Requests

1. **Get all featured Nike products sorted by price descending**:

   ```http
   GET /api/v1/products?featured=true&company=Nike&sort=-price
   ```

2. **Get products with a rating of 4 or higher, limited to 5 per page**:

   ```http
   GET /api/v1/products?numericFilters=rating>=4&limit=5
   ```

## License

This project is licensed under the MIT License.