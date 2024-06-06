# MxAgro Paystack

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

## About

This repository is a backend server designed to facilitate payment processing using the Paystack API. This server handles payment initiation, webhook processing, and order creation, making it easier to integrate Paystack into your e-commerce platform. Built with Express.js and Axios, it provides a reliable and efficient way to manage payments for agricultural products.

### Types of Applications

This server can be used to build various types of applications, including:
- **E-commerce Platforms:** For online sales of agricultural products and other goods.
- **Subscription Services:** For managing recurring payments and subscriptions.
- **Donation Platforms:** For processing donations and contributions.
- **Marketplace Platforms:** For handling payments between buyers and multiple sellers.

## Features

- **Payment Initiation:** Start a payment process with Paystack by providing necessary details like amount, email, and metadata.
- **Webhook Handling:** Securely handle Paystack webhooks to verify payment events and process orders accordingly.
- **Order Creation:** Automatically create orders in the MxAgro backend upon successful payment verification.
- **Environment Configuration:** Securely manage sensitive information using environment variables.
- **Express Middleware:** Utilize Express middleware for JSON parsing and CORS handling.

## Technologies Used

- **Express.js:** For building the server and handling HTTP requests.
- **Axios:** For making HTTP requests to Paystack API and other external services.
- **dotenv:** For managing environment variables.
- **CORS:** For handling Cross-Origin Resource Sharing.
- **Crypto:** For verifying Paystack webhook signatures.
- **Nodemon:** For automatically restarting the server during development.

## Getting Started

To get started with the MxAgro Paystack server, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the command:
    ```bash
    git clone https://github.com/AbdulBima/MxAgro_Paystack.git
    ```
2. **Navigate to the Project Directory:** 
    ```bash
    cd MxAgroPaystack
    ```
3. **Install Dependencies:** Install the necessary dependencies by running:
    ```bash
    npm install
    ```
4. **Set Up Environment Variables:** Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=<your-port>
    FRONTEND=<your-frontend-url>
    PAYSTACK_KEY=<your-paystack-secret-key>
    ```
5. **Start the Development Server:** Start the development server by running:
    ```bash
    npm run dev
    ```
6. **View the Server Logs:** The server will log the URL it is running on. Open your browser and navigate to `http://localhost:3000` to view the server's response.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

### Example `.env` File

Here's an example of what your `.env` file might look like:

```env
PORT=3000
FRONTEND=http://localhost:3000
PAYSTACK_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxx
```

### Scripts in `package.json`

- **serve:** Runs the server using Node.js.
    ```bash
    npm run serve
    ```
- **dev:** Runs the server using Nodemon for automatic restarts during development.
    ```bash
    npm run dev
    ```