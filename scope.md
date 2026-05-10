Project Scope: Product CRUD API using Express.js and MongoDB

Objective:

Develop a backend RESTful API to manage products (Create, Read, Update, Delete) using Express.js and MongoDB. The API will allow basic operations for managing product data in a store or inventory system.

Tech Stack

Backend Framework: Express.js (Node.js)
Database: MongoDB (Mongoose ODM)
Tools: Postman (for API testing), Nodemon, dotenv
Version Control: Git (optional)
Optional: Swagger for API documentation

Core Features

1. Create Product

Endpoint: POST /api/products
Body: { name, description, price, category, inStock }
Action: Save product to MongoDB. 

2. Read All Products

Endpoint: GET /api/products
Action: Retrieve all products. 

3. Read Single Product

Endpoint: GET /api/products/:id
Action: Get a product by its ID. 

4. Update Product

Endpoint: PUT /api/products/:id
Action: Update an existing product. 

5. Delete Product

Endpoint: DELETE /api/products/:id
Action: Remove a product by ID.

Model Structure

Product Schema (Mongoose)

{

name: { type: String, required: true },

description: String,

price: { type: Number, required: true },

category: String,

inStock: { type: Boolean, default: true },

createdAt: { type: Date, default: Date.now }

}

Deliverables
· Fully working REST API

· Well-organized project structure

· .env file for DB credentials

· Sample API request body & response

· Optional: GitHub repo & documentation


<!-- {
  "name": "iPhone 15",
  "description": "Apple smartphone",
  "price": 79999,
  "category": "Mobile",
  "inStock": true
} -->
