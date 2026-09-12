const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;


// WEBHOOK ROUTE
app.post(
    "/webhook/payment",
    express.raw({ type: "application/json" }),
    (req, res) => {

        try {

            const signature =
                req.headers["x-webhook-signature"];

            if (!signature) {
                return res
                    .status(400)
                    .send("Missing signature");
            }


            // Generate expected signature

            const expectedSignature =
                crypto
                    .createHmac(
                        "sha256",
                        WEBHOOK_SECRET
                    )
                    .update(req.body)
                    .digest("hex");


            // Compare signatures

            if (signature !== expectedSignature) {
                return res
                    .status(401)
                    .send("Invalid signature");
            }


            // Convert raw body → JSON

            const event =
                JSON.parse(req.body.toString());


            console.log("Webhook received:");
            console.log(event);


            // Event handling

            switch (event.type) {

                case "payment.success":

                    console.log(
                        "Payment successful"
                    );

                    break;


                case "payment.failed":

                    console.log(
                        "Payment failed"
                    );

                    break;


                case "payment.refunded":

                    console.log(
                        "Payment refunded"
                    );

                    break;


                default:

                    console.log(
                        "Unknown event"
                    );
            }


            return res
                .status(200)
                .json({
                    success: true
                });

        } catch (error) {

            console.error(error);

            return res
                .status(500)
                .send("Webhook processing failed");
        }
    }
);


// NORMAL JSON MIDDLEWARE

app.use(express.json());


// Normal route

app.get("/", (req, res) => {

    res.json({
        message: "Server running"
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});