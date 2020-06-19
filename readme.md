# Shopping Cart

### Steps to run the API

Clone the repository
```sh
$ git clone git@github.com:amitkishore007/shopping-cart.git
```

Move into to directory
```sh
$ cd shopping-cart
```

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
```
Start the dev server.

```sh
$ npm run dev
```
OR

Start the production server.

```sh
$ npm run start
```

Before using any API, Seed the dummy data into database.

```sh
$ npm run seed

Output:
Starting Seed for 3 files
Running seed for category
Running seed for product
Running seed for user
Success seed
```
Above command will seed dummy products, categories and users in the db.

List of commands:
| Command | Purpose |
| ------ | ------ |
| npm run seed | Seed dummy data into database |
| npm run dev | Start the dev server |
| npm run start | Start the production server |
| npm run test | Run the test cases |

### Features

Below are the list of features along with the API Endpoints.

| Plugin | README |
| ------ | ------ |
| Product | /api/v1/products |
| Category | /api/v1/categories |
| Session | /api/v1/session |
| Cart | /api/v1/cart |

> API Documentation and useses
### Product

Get the list of all the products:
```json
Method: GET
ENDPOINT: /api/v1/products

Response: 
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": "5eeb5931895ba91d1cd20a52",
            "name": "Round neck T-Shirt",
            "category": {
                "id": "5eeb5931895ba91d1cd20a4e",
                "name": "T-Shirt",
                "type": "clothing"
            },
            "description": "This is a clothing product",
            "price": "12.2",
            "make": 2019
        }
    ]
}
```

Get the list of all the products:
```json
METHOD: GET
ENDPOINT: /api/v1/products
QUERY PARAM : { category: "{category_id}" }

e.g: /api/v1/products?category=5eeb5931895ba91d1cd20a4e

Response: 
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": "5eeb5931895ba91d1cd20a52",
            "name": "Round neck T-Shirt",
            "category": {
                "id": "5eeb5931895ba91d1cd20a4e",
                "name": "T-Shirt",
                "type": "clothing"
            },
            "description": "This is a clothing product",
            "price": "12.2",
            "make": 2019
        },
        {
            "id": "5eeb5931895ba91d1cd20a53",
            "name": "v neck T-Shirt",
            "category": {
                "id": "5eeb5931895ba91d1cd20a4e",
                "name": "T-Shirt",
                "type": "clothing"
            },
            "description": "This is a clothing product",
            "price": "9.2",
            "make": 2018
        }
    ]
}
```

### Category

Get the list of all the categories:
```json
Method: GET
ENDPOINT: /api/v1/categories

Response:
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "id": "5eeb5931895ba91d1cd20a4e",
            "name": "T-Shirt",
            "type": "clothing"
        },
        {
            "id": "5eeb5931895ba91d1cd20a4f",
            "name": "Jeans",
            "type": "clothing"
        },
        {
            "id": "5eeb5931895ba91d1cd20a50",
            "name": "Coffee",
            "type": "food"
        },
        {
            "id": "5eeb5931895ba91d1cd20a51",
            "name": "Tea",
            "type": "food"
        }
    ]
}
```

### Session / Login

To login into the system we need to use Basic Auth 
e.g. send user credentials in the header as followed

```json
Authorization Basic bG9raUBtYWlsLmNvbTpkZW1vQDEyMw==
```

```json
Above "bG9raUBtYWlsLmNvbTpkZW1vQDEyMw==" is base64 encoded string of user's credentials generated using this format user_email:password
```

on running the seed command few users will seeded into the system as followed

| Email | Password |
| ------ | ------ |
| iron.man@mail.com | demo@123 |
| thor@mail.com | demo@123 |
| loki@mail.com | demo@123 |

Open Postman and in the Authorization tab choose Basic Auth and use above mentioned email & pass

Request to login:
```json
URL: /api/v1/session
METHOD: POST
HEADERS: { Authorization Basic `token` }

Response:
{
    "status": "success",
    "code": 200,
    "data": {
        "token": "0a7a0c74dbd3542eb8371944ff1afc048b0f767b4b1afaf3b390e1ca926217c85eea86050d69ec4254ffc1ae",
        "user": {
            "id": "5eea86050d69ec4254ffc1ae",
            "name": "Loki",
            "email_address": "loki@mail.com"
        }
    }
}

*Note: `token` is the session id & user will not be able to add product into cart without this `token`.
```

### Cart


Adding Product to cart:
```json
ENDPOINT: /api/v1/cart
METHOD: POST
BODY: { product:`product_id`, quantity: `number`(optional) }

HEADER: { 'X-SESSION-ID': `token` }

Response:
{
    "status": "success",
    "code": 200,
    "data": {}
}
```

Get User cart:
```json
ENDPOINT: /api/v1/cart
METHOD: GET

HEADER: { 'X-SESSION-ID': `token` }

Response:
{
    "status": "success",
    "code": 200,
    "data": {
        "id": "5eecf7e041ea1a844a32399b",
        "user": "5eea86050d69ec4254ffc1ae",
        "quantity": 1,
        "total": 2.2,
        "products": [
            {
                "_id": "5eecf7e06afd512db0eef217",
                "name": "Lemon Tea",
                "price": 2.2,
                "product_id": "5eeb5931895ba91d1cd20a56",
                "quantity": 1
            }
        ]
    }
}
```

## Test Cases - Mocha library

Running the test cases:
```json
$ npm run test


Output:

 Cart
    √ Add Item to cart
    √ Get user cart items

  Categories
    √ Get All Category
    √ Get Category with valid id
    √ Get Category with invalid id

  Product
    √ Get All Products
    √ Get Single Product
    √ Get Products of a Category

  Session
    √ Login with valid credentials (69ms)
    √ Login with invalid credentials (67ms)


  10 passing (478ms)
```

## Error Responses

Invalid Url:
```json
{
    "status": "failed",
    "code": 400,
    "errors": [
        {
            "type": "BAD_REQUEST",
            "message": "Resource does not exist or has been removed."
        }
    ]
}
```


Invalid Request Data:
```json
{
    "status": "failed",
    "code": 400,
    "errors": [
        {
            "type": "BAD_REQUEST",
            "message": "The value of the field is invalid",
            "parameter": "category"
        }
    ]
}
```


Try to access unauthorized resource:
```json
{
    "status": "failed",
    "code": 401,
    "errors": [
        {
            "type": "AUTHORIZATION_REQUIRED",
            "message": "Performing this action on this resource requires authorization"
        }
    ]
}

```

Invalid Credentials while login:
```json
{
    "status": "failed",
    "code": 454,
    "errors": [
        {
            "type": "SESSION_LOADING_FAILED",
            "message": "The server failed to load the session"
        }
    ]
}
```