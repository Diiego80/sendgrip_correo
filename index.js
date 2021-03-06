import express from "express"; //Module
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv;'

dotenv.config()
const app = express();
const port = 3000;
sgMail.setApiKey(process.env.SGKEY);

app.use(express.json());
app.use(express.static("app"));

app.get("/", (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)

    const msg = {
        to: "diego.ortega@mop.gov.cl", // Change to your recipient
        from: process.env.FROM, // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
    .send(msg)
    .then(() => {
        console.log("Email sent");
    })
    .catch((error) => {
    console.error(error);
    });
});

app.listen(port, () => console.log("App corriendo en :", port));
