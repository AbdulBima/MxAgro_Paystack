require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 3000;

const FRONTEND = process.env.FRONTEND;
const paystackSecretKey = process.env.PAYSTACK_KEY;

app.use(express.json()); // Middleware for parsing JSON
app.use(cors());

app.post("/api/initiate-payment", async (req, res) => {



    try {
        const { amount, email, metadata } = req.body || {};

        const paystackInitiateUrl = "https://api.paystack.co/transaction/initialize";

        const paystackResponse = await axios.post(
            paystackInitiateUrl,
            { email, amount, metadata },
            {
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const authorizationUrl = paystackResponse.data.data.authorization_url;
        res.json({ authorization_url: authorizationUrl });
    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

app.post("/paystack-webhook", async (req, res) => {
	try {
		const hash = crypto
			.createHmac("sha512", paystackSecretKey)
			.update(JSON.stringify(req.body))
			.digest("hex");

		if (hash !== req.headers["x-paystack-signature"]) {
			console.error("Paystack signature verification failed");
			return res.status(403).json({
				status: "error",
				message: "Paystack signature verification failed",
			});
		}

		const { data: webhookResponse } = req.body;


		const metadata = webhookResponse.metadata;

		if (!metadata || !metadata.custom_fields) {
			console.error("Metadata or custom_fields is missing in Paystack webhook payload.");
			return res.status(400).json({
				status: "error",
				message: "Invalid Paystack webhook payload.",
			});
		}

		const requiredFields = [
			"cart_products",
			"buyer_id",
			"buyer_contact",
			"buyer_address",
			"buyer_city",
			"buyer_state",
		];

		const customFields = metadata.custom_fields.reduce((acc, field) => {
			acc[field.variable_name] = field.value;
			return acc;
		}, {});

		for (const field of requiredFields) {
			if (!customFields[field]) {
				console.error(`${field} is missing in Paystack webhook payload.`);
				return res.status(400).json({
					status: "error",
					message: `${field} is required.`,
				});
			}
		}

		const cartProducts = JSON.parse(customFields.cart_products);
		const buyerId = customFields.buyer_id;
		const buyerContact = customFields.buyer_contact;
		const buyerAddress = customFields.buyer_address;
		const buyerCity = customFields.buyer_city;
		const buyerState = customFields.buyer_state;

		const customerEmail = webhookResponse.customer.email;
		const amount = webhookResponse.amount;

		const orderResponse = await axios.post(
			FRONTEND,
			{
				buyerId: buyerId,
				buyerEmail: customerEmail,
				buyerContact: buyerContact,
				buyerAddress: buyerAddress,
				buyerCity: buyerCity,
				buyerState: buyerState,
				orderAmount: amount,
				order: cartProducts,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		console.log("Order response:", orderResponse.data);
		res.json({ status: "success" });
	} catch (error) {
		console.error("Error handling Paystack webhook:", error);
		res.status(500).json({ status: "error" });
	}
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
